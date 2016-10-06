angular.module('app')
.controller('app-controller', function ($scope, $location, UserSvc, $timeout){
  $scope.isLoggedIn = UserSvc.isLoggedIn();

  $scope.logout = function(){
    UserSvc.logout().success(function(){
      $scope.currentUser = null;
      $scope.isLoggedIn = false;
    });

  }

  $scope.success = "";
  $scope.showSuccessMessage = false;

  $scope.$on('login', function(_, user){
    $scope.currentUser = user;
    $scope.isLoggedIn = UserSvc.isLoggedIn();
  });

  $scope.$on('successPopup', function(_, message){
    $scope.success = message;
    $scope.showSuccessMessage = true;
    $timeout(function() {
      $scope.showSuccessMessage = false;
      $scope.success = "";
    }, 3000);
  });

  $scope.closePopup = function(){
    $scope.showSuccessMessage = false;
  }

  $scope.go = function(path) {
    $location.path( path );
  };

})
.filter("sanitize", ['$sce', function($sce) {
  return function(htmlCode){
    return $sce.trustAsHtml(htmlCode);
  }
}]);
