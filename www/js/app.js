// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','firebase'])
.factory('CareTakers',['$firebaseArray',function($firebaseArray){
    var itemsRef=new Firebase('https://caretakers.firebaseio.com/careTaker');
    return $firebaseArray(itemsRef);
}]).
controller('ListCtrl',function($scope, $ionicListDelegate, CareTakers){
    $scope.careTakers=CareTakers;
    
    $scope.addCareTaker=function(){
        var name=prompt('Enter Name of Care Taker : ');
        if(name){
            $scope.careTakers.$add({
                'name':name
            });
        }
    }
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