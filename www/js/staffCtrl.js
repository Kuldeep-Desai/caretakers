myapp.controller('ListCtrl', function ($scope, $ionicListDelegate, $state, Staff,$ionicListDelegate) {
  $scope.careTakers = Staff.Staff;
  $scope.staff = {};
  $scope.fbStaff = null;
  var ISODateString = function (d) {
    function pad(n) { return n < 10 ? '0' + n : n; }
    return d.getUTCFullYear() + "-" + pad(d.getUTCMonth() + 1)+ "-" + pad(d.getUTCDate())+"T"+pad(d.getUTCHours())+":"+pad(d.getUTCMinutes())+":"+pad(d.getUTCSeconds())+"Z";
  };
  if ($state.params.id) {
    
      Staff.StaffById($state.params.id).then(function (localStaff) {
        $scope.staff.fname = localStaff.fname;
        $scope.staff.lname = localStaff.lname;
        $scope.staff.dob = localStaff.dob ? new Date(localStaff.dob): null;
        $scope.staff.doj = localStaff.doj ? new Date(localStaff.doj): null;
        $scope.staff.gender = localStaff.gender;
        $scope.staff.active = localStaff.active;
        $scope.staff.slot = localStaff.slot;
        $scope.staff.phone = localStaff.phone;
        $scope.fbStaff = localStaff;
      });
    
  }
  
  $scope.delete = function (staff) {
    var c = confirm("Confirm Delete "+staff.fname+" "+staff.lname+" ?");
    if (c) {
      Staff.StaffById(staff.$id).then(function (localStaff) {
        localStaff.$remove().then(function () {
          alert('Deleted');
          $ionicListDelegate.closeOptionButtons();
        });
      });
    }
  };
  $scope.addStaff = function () {
    //$state.go("#/staff/add");
    $scope.staff = {
      fname: null,
      lname: null,
      phone: null,
      dob: null,
      doj: null,
      gender: "female",
      active: true,
      slot:null
    };
  };
  $scope.goback = function () {
    $state.go("login");
  };
  $scope.addStaffMember = function () {
    var newStaff = {
      "fname": $scope.staff.fname?$scope.staff.fname:null,
      "lname": $scope.staff.lname?$scope.staff.lname:null,
      "phone": $scope.staff.phone?$scope.staff.phone:null,
      "slot": $scope.staff.slot?$scope.staff.slot:null,
      "dob": $scope.staff.dob ? $scope.staff.dob.getTime() : null,
      "doj": $scope.staff.doj ? $scope.staff.doj.getTime() : null,
      "gender": $scope.staff.gender ? $scope.staff.gender.toString() : null,
      "active": $scope.staff.active === true
    };
    if ($scope.fbStaff) {
      $scope.fbStaff.fname = newStaff.fname;
      $scope.fbStaff.lname = newStaff.lname;
      $scope.fbStaff.phone = newStaff.phone;
      $scope.fbStaff.slot= newStaff.slot;
      $scope.fbStaff.dob = newStaff.dob;
      $scope.fbStaff.doj = newStaff.doj;
      $scope.fbStaff.gender = newStaff.gender;
      $scope.fbStaff.active= newStaff.active;
      
      $scope.fbStaff.$save();
    } else {
      $scope.careTakers.$add(newStaff);
    }
    
  };
  $scope.viewStaff = function () {
    alert($state.params.id);
  };
});