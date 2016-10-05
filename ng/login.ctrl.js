angular.module('app')
.controller('LoginController', function ($scope, $location, UserSvc){
  var vm = this;

  vm.credentials = {
    username: "",
    password: ""
  };

  vm.login = function(){
    UserSvc
      .login(vm.credentials)
      .error(function(err){
        vm.errors = err;
      })
      .success(function(user){
        $location.path('/');
        $scope.$emit('login', UserSvc.getCurrentUser());
        $scope.$emit('successPopup', "User was successfully logged in");
    });
  }
});
