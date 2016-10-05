angular.module('app')
.controller('app-controller', function ($scope, $location, UserSvc, $timeout){
  $scope.isLoggedIn = UserSvc.isLoggedIn();

  $scope.alreadyAdded = function(name){
    console.log('Checking if ' + name + ' in list');
    // Check if the user already has this beer in their list

    UserSvc.fetchReviews().success(function(reviews){
      var beers = [];

      for (var i = 0; i < reviews.length; i++){
        beers.push(reviews[i].beer.name);
      }

      console.log(beers);
      console.log(beers.indexOf(name) > 1);
      return beers.indexOf(name) > 1;
    });

  }

  $scope.logout = function(){
    UserSvc.logout();
    $scope.currentUser = UserSvc.getCurrentUser();
    $scope.isLoggedIn = UserSvc.isLoggedIn();
  }

  $scope.success = "";
  $scope.showSuccessMessage = false;

  $scope.$on('login', function(_, user){
    $scope.currentUser = user;
    $scope.isLoggedIn = UserSvc.isLoggedIn();
  });

  $scope.$on('successPopup', function(_, message){
    console.log(message);
    $scope.success = message;
    $scope.showSuccessMessage = true;
    $timeout(function() {
      $scope.showSuccessMessage = false;
      $scope.success = "";
    }, 6000);
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
