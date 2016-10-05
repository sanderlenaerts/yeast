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
