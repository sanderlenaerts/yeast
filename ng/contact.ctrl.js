angular.module('app')
.controller('ContactController', function ($scope, $http, $timeout, UserSvc){

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
