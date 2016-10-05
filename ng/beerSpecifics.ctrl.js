angular.module('app')
.controller('BeerSpecificsController', function ($scope, BeersService, UserSvc, $location, $routeParams){


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

  var beerId = $routeParams.beerId;
  BeersService.fetch(beerId).success(function(beer){
    $scope.beer = beer;
    $scope.added = alreadyAdded(beer.name);
  });
});
