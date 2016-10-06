angular.module('app')
.controller('MyBeersController', function ($http, $sanitize, $scope, BeersService, UserSvc, $location){

  //Set the searchbox value to an empty String
  $scope.query = '';

  $scope.removeReview = function(review){
    var index = $scope.reviews.indexOf(review);
    $scope.reviews.splice(index, 1);
    $http.post('/api/review/delete', {
      id: review._id
    }).success(function(msg){
        $location.path('/reviews');
        $scope.$emit('successPopup', "Review was successfully deleted");
    })
  }

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
      $scope.reviews = reviews;
    });


});
