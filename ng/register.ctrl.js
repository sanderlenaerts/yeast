angular.module('app')
.controller('RegisterController', function ($scope, UserSvc, $location){
  var vm = this;

  vm.credentials = {
    username: "",
    password: "",
    name: ""
  };



  vm.register = function(){
    UserSvc
      .register(vm.credentials)
      .error(function(err){
        vm.errors = err;
      })
      .success(function(resp){
        $location.path('/');
        $scope.$emit('login', UserSvc.getCurrentUser());
        $scope.$emit('successPopup', "Successfully registered as a new Yeast! user");
      });
  }
});
