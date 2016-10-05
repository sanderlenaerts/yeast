var router = require('express').Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jwt-simple');
var config = require('../../config');
var passport = require('passport');
var expressValidator = require('express-validator');
var util = require('util');




var loginschema = {
 'username': {
    notEmpty: {
      value: true,
      errorMessage: "Username cannot be empty"
    },
    isEmail: {
      errorMessage: 'E-mail must be of pattern user@domain.code'
    }
  },
  'password': {
    notEmpty: {
      value: true,
      errorMessage: "Password cannot be empty"
    },
    matches: {
      options: [{min: 6, max: 30}],
      errorMessage: "Password must be between 6 and 30 characters" // pass options to the validator with the options property as an array
      // options: [/example/i] // matches also accepts the full expression in the first parameter
    }
  }
};

var schema = {
 'username': {
    notEmpty: {
      value: true,
      errorMessage: "Username cannot be empty"
    },
    isEmail: {
      errorMessage: 'E-mail must be of pattern user@domain.code'
    }
  },
  'password': {
    notEmpty: {
      value: true,
      errorMessage: "Password cannot be empty"
    },
    matches: {
      options: [{min: 6, max: 30}],
      errorMessage: "Password must be between 6 and 30 characters" // pass options to the validator with the options property as an array
      // options: [/example/i] // matches also accepts the full expression in the first parameter
    }
  },
  'name':{
    notEmpty: {
      value: true,
      errorMessage: "Name cannot be empty"
    },
    isLength: {
      options: [{min: 4, max: 20}],
      errorMessage: "Name must be between 4 and 20 characters"
    }
  }
};


module.exports.register = function(req, res, next) {

  // if(!req.body.name || !req.body.email || !req.body.password) {
  //   sendJSONresponse(res, 400, {
  //     "message": "All fields required"
  //   });
  //   return;
  // }

  var user = new User();

  req.check(schema);

  var errors = req.validationErrors();

  if (errors){
    res.status(400).json(errors);
  }
  else {
    user.name = req.body.name;
    user.username = req.body.username;

    user.setPassword(req.body.password);


    user.save(function(err){

      // Check if there is a MongoError with code 11000
      // This means there is an account with this username already
      if (err && err.name == "MongoError" && err.code=="11000"){
        var error = new Error("A user already exists with that e-mail address. Please use another.");
        error.status = 409;
        res.status(error.status).json([{msg: error.message}])
      }
      else if (err) {
        next(err);
      }
      else {
        var token;
        token = user.generateJwt();
        res.status(201).json({'message': 'User was added correctly', 'success': true, 'token': token});
      }
    });

  }


};


module.exports.login = function(req, res) {

  // if(!req.body.email || !req.body.password) {
  //   sendJSONresponse(res, 400, {
  //     "message": "All fields required"
  //   });
  //   return;
  // }

  req.check(loginschema);

  var errors = req.validationErrors();

  if (errors){
    res.status(400).json(errors);
  }
  else {
    passport.authenticate('local', function(err, user, info){
      var token;

      // If Passport throws/catches an error
      if (err) {
        res.status(404).json(err);
        return;
      }

      // If a user is found
      if(user){
        token = user.generateJwt();
        res.status(200);
        res.json({
          "token" : token
        });
      } else {
        // If user is not found
        res.status(401).json(info);
      }
    })(req, res);
  }



};
