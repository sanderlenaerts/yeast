angular.module('app', ['ngRoute', 'ngSanitize', 'angularUtils.directives.dirPagination']);

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

angular.module('app')
.service('UserSvc', ['$http', '$window', function($http, $window){
    var svc = this;

    svc.fetchReviews = function(){
      return $http.post('/api/reviews', {
        userId: svc.getCurrentUser()._id
      });
    }

    svc.getUser = function(){
      return $http.get('/api/users').then(function(response){
        return response.data;
      });
    }

    svc.login = function(credentials){
      return $http.post('/api/login', {
        username: credentials.username, password: credentials.password, name: credentials.name
      }).success(function(val){
        saveToken(val.token);
        return val;
      })
      .error(function(err){
        return err;
      });
    }

    svc.logout = function(){
      $window.localStorage.removeItem('mean-token');
    }

    svc.register = function(credentials){
      return $http.post('/api/register', credentials)
      .success(function(response){
        saveToken(response.token);
        return response;
      })
      .error(function(err){
        return err;
      });
    }

    var saveToken = function (token) {
      $window.localStorage['mean-token'] = token;
    };

    var getToken = function () {
      return $window.localStorage['mean-token'];
    };

    svc.isLoggedIn = function() {
      var token = getToken();
      var payload;

      if(token){
        payload = token.split('.')[1];
        payload = $window.atob(payload);
        payload = JSON.parse(payload);

        return payload.exp > Date.now() / 1000;
      }
      else {
        return false;
      }
    };

     svc.getCurrentUser = function() {
      if(svc.isLoggedIn()){
        var token = getToken();
        var payload = token.split('.')[1];
        payload = $window.atob(payload);
        payload = JSON.parse(payload);
        return {
          _id: payload._id,
          name: payload.name,
          username : payload.username
        };
      }
    };

  }]);

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

angular.module('app')
.controller('ContactController', function ($scope, $http, $timeout){

  var ct = this;

  ct.showSuccessMessage = false;

  ct.mail = {
    name: '',
    email: '',
    message: ''
  }

  ct.closePopup = function(){
    ct.showSuccessMessage = false;
  }

  ct.sendMail = function(){
    $http.post('/api/mail',
        ct.mail
      )
      .error(function(err){
        ct.errors = err;
      })
      .success(function(data){
        ct.success = "Thank you for sending us an e-mail, " + data.name;
        ct.showSuccessMessage = true;
        ct.mail = {
          name: '',
          email: '',
          message: ''
        }
        $timeout(function() {
          ct.showSuccessMessage = false;
        }, 6000);
      });
  }


});

angular.module('app')
.controller('LoginController', function ($scope, $location, UserSvc){
  var vm = this;

  vm.credentials = {
    username: "",
    password: ""
  };

  vm.login = function(){
    UserSvc
      .login(vm.credentials)
      .error(function(err){
        vm.errors = err;
      })
      .success(function(user){
        $location.path('/');
        $scope.$emit('login', UserSvc.getCurrentUser());
        $scope.$emit('successPopup', "User was successfully logged in");
    });
  }
});

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

angular.module('app')
.controller('RegisterController', function ($scope, UserSvc, $location){
  var vm = this;

  vm.credentials = {
    username: "",
    password: "",
    name: ""
  };



  vm.register = function(){
    UserSvc
      .register(vm.credentials)
      .error(function(err){
        vm.errors = err;
      })
      .success(function(resp){
        $location.path('/');
        $scope.$emit('login', UserSvc.getCurrentUser());
        $scope.$emit('successPopup', "Successfully registered as a new Yeast! user");
      });
  }
});

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
