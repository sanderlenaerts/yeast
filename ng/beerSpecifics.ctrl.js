angular.module('app')
.controller('BeerSpecificsController', function ($scope, BeersService, UserSvc, $location, $routeParams){



  var beerId = $routeParams.beerId;
  BeersService.fetch(beerId).success(function(beer){
    $scope.beer = beer;
  });
});
