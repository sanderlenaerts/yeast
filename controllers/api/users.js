var router = require('express').Router();
var User = require('../../models/user');
var bcrypt = require('bcrypt');
var jwt = require('jwt-simple');


router.get('/', function(req, res){

  if (!req.headers['x-auth']){
    return res.send(401);
  }

  var token = req.headers['x-auth'];
  var auth = jwt.decode(token, config.secret);
  console.log(auth);
  User.findOne({username: auth.username}, function(err, user){
      console.log("Found user in API " + user);
      res.json(user);
  })
});


module.exports = router;
