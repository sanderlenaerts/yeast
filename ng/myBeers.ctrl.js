angular.module('app')
.controller('MyBeersController', function ($sanitize, $scope, BeersService, UserSvc, $location){

  //Set the searchbox value to an empty String
  $scope.query = '';

  $scope.search = function(item){
    if (!$scope.query || (item.beer.name.toLowerCase().indexOf($scope.query) != -1)){
        return true;
    }
    return false;
 };

  $scope.sanitizeHTML = function(v){
    return $sanitize(v);
  }

    UserSvc.fetchReviews().success(function(reviews){
      console.log(reviews);
      $scope.reviews = reviews;
    });


});
