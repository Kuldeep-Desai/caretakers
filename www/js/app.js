// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var myapp = angular.module('starter', ['ionic', 'firebase']);

myapp.config(function ($stateProvider, $urlRouterProvider) {
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
      controller: "ListCtrl"/*,
      resolve: {
        $currentAuth: function (Auth) {
          return Auth.$requireAuth();
        }
      }*/
    })
    .state("newStaff", {
      url: "/staff/new",
      templateUrl: "templates/staffadd.html",
      controller: "ListCtrl"
    })
    .state("viewStaff", {
      url: "/staff/:id/view",
      templateUrl: 'templates/staffview.html',
      controller: "ListCtrl"
    })
    .state("editStaff", {
      url: "/staff/:id/edit",
      templateUrl: "templates/staffadd.html",
      controller:"ListCtrl"
    });
  $urlRouterProvider.otherwise("/staff");
}); 
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
myapp.run(["$rootScope", "$state", function ($rootScope, $state) {
  $rootScope.$on("$stateChangeError", function (event, toState, toParams, fromState, fromParams, error) {
    if (error === "AUTH_REQUIRED") {
      $state.go("login");
    }
  });

}]);

