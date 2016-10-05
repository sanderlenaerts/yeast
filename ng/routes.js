angular.module('app')
.config(function($routeProvider){
  $routeProvider
    .when('/', {
      templateUrl: 'index.html'
    })
    .when('/contact', {
      controller: 'ContactController',
      templateUrl: 'contact.html',
      controllerAs: 'ct'
    })
    .when('/beers', {
      controller: 'BeersController',
      templateUrl: 'beers.html'
    })
    .when('/reviews', {
      templateUrl: 'my-beers.html',
      controller: 'MyBeersController'
    })
    .when('/beers/:beerId', {
      controller: 'BeerSpecificsController',
      templateUrl: 'beer-specifics.html'
    })
    .when('/review/:beerId', {
      controller: 'ReviewController',
      templateUrl: 'beer-review.html'
    })
    .when('/register', {
      controller: 'RegisterController',
      controllerAs: 'vm',
      templateUrl: 'register.html'
    })
    .when('/login', {
      controller: 'LoginController',
      templateUrl: 'login.html',
      controllerAs: 'vm'
    })
  });
