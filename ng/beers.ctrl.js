angular.module('app')
.controller('BeersController', function ($sanitize, $scope, BeersService, UserSvc, $location){

  //Set the searchbox value to an empty String
  $scope.searchBeers = '';

  $scope.sanitizeHTML = function(v){
    return $sanitize(v);
  }

    BeersService.fetchAll().success(function(beers){
      $scope.beers = beers;
      $scope.$emit('login', UserSvc.getCurrentUser());
    });


});
