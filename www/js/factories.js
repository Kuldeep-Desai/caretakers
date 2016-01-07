myapp.factory('Staff', function ($firebaseArray, $firebase,$firebaseObject,$q) {
    var url = 'https://caretakers.firebaseio.com/staff';
    var itemsRef = new Firebase(url);
    var vm = {};
    vm.Staff = $firebaseArray(itemsRef);
    vm.StaffById = function (id) {
        return $q(function (resolve, reject) {
            var fbUrl = new Firebase(url + "/" + id);
            var obj = $firebaseObject(fbUrl);
            obj.$loaded().then(function () {
                resolve(obj);
            });
           
        });
        
    };
    return vm;
});

myapp.factory('Auth', function ($firebaseAuth) {
    var url = 'https://caretakers.firebaseio.com/users';
    var itemsRef = new Firebase(url);
    return $firebaseAuth(itemsRef);
});