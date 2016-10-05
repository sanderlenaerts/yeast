angular.module('app')
.controller('ReviewController', function ($scope, $location, UserSvc, $routeParams, BeersService, $http){

  var beerId = $routeParams.beerId;
  BeersService.fetch(beerId).success(function(beer){
    $scope.beer = beer;
  });
  $scope.score = 5;

  console.log("ReviewController");
  console.table(UserSvc.getCurrentUser());

  $scope.addReview = function(){
    $http.post('/api/review', {
      score: $scope.score,
      user: UserSvc.getCurrentUser()._id,
      beer: beerId
    }).error(function(err){
      $scope.errors = err;
    }).success(function(msg){
      //Go to beers page
      // Show success message
    })
  }

});
