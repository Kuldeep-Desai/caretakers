myapp.controller("loginCtrl", function ($scope, Auth, $state) {
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
    else {
      console.log("Logged in as : ", authData.uid);
      $state.go("staff");
    }
    $scope.authData = authData;
  });
});
myapp.controller("homeCtrl", function ($scope) {

});