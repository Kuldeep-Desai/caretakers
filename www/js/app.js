// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'firebase'])
  .factory('Staff', ['$firebaseArray', function ($firebaseArray, $firebase) {
    var url = 'https://caretakers.firebaseio.com/staff';
    var itemsRef = new Firebase(url);
    return $firebaseArray(itemsRef);
  }])
  .factory('Auth', function ($firebaseAuth) {
    var url = 'https://caretakers.firebaseio.com/users';
    var itemsRef = new Firebase(url);
    return $firebaseAuth(itemsRef);
  })
  
  .controller("loginCtrl", function ($scope, Auth) {
    //$scope.authData = null;
    $scope.login = function () {
      Auth.$authWithOAuthRedirect("facebook").then(function (authData) {
        console.log(authData);
        $scope.authData = authData;
      }).catch(function (error) {
        if (error.code === "TRANSPORT_UNAVAILABLE") {
          Auth.$authWithOAuthPopup("facebook").then(function (authData) {
            console.log("From Popup", authData);
            $scope.authData = authData;
          });
        }
        else {
          console.log(error);
        }
      });
    };
    $scope.logout = function () {
      Auth.$unauth();
    };
    Auth.$onAuth(function (authData) {
      if (authData === null)
        console.log("Not logged in yet");
      else
        console.log("Logged in as : ", authData.uid);
      $scope.authData = authData;
    });
  })
  .controller("homeCtrl", function ($scope) {

  })
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state("login", {
        url: "/login",
        templateUrl: "templates/login.html",
        controller: "loginCtrl"
      })
      .state("home", {
        url: "/home",
        templateUrl: "templates/home.html",
        controller: "homeCtrl"
      })
      .state("staff", {
        url: "/staff",
        templateUrl: "templates/staff.html",
        controller: "ListCtrl",
        resolve: {
          $currentAuth : function (Auth) {
            return Auth.$requireAuth();
          }
        }
      });
    $urlRouterProvider.otherwise("/login");

  })
  .controller('ListCtrl', function ($scope, $ionicListDelegate, Staff) {
    $scope.careTakers = Staff;

    $scope.addStaff = function () {
      var name = prompt('Enter Name of Care Taker : ');
      if (name) {
        $scope.careTakers.$add({
          "name": name
        });
      }
    };
  })
/*.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})*/
.run(["$rootScope", "$state", function ($rootScope, $state) {
  $rootScope.$on("$stateChangeError", function (event, toState, toParams, fromState, fromParams, error) {
    if (error === "AUTH_REQUIRED") {
      $state.go("login");
    }
  });
 
}]);

