angular.module('app')
.service('BeersService', function($http){
    this.fetchAll = function(){
      return $http.get('/api/beers');
    }

    this.fetch = function(beerId){
      return $http.get('/api/beers/' + beerId);
    }

    this.create = function(post){
      return $http.post('/api/posts', post);
    }
});
