var express = require('express');
var bodyParser = require('body-parser');
var passport = require('passport');
var User = require('./models/user');
var expressValidator = require('express-validator');

require('./db');
require('./config/passport');

var app = express();



var PORT = process.env.PORT || 3000;


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(expressValidator([]));

app.use(passport.initialize());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(require('./controllers/static'))

app.use('/api', require('./controllers/api/routes'));


app.use(function(err, req, res, next) {
  // Only handles `next(err)` calls
  res.status(err.status || 500);
  res.send({message: err.message});
});


app.listen(PORT, function(){
  console.log('Server listening on port ' + PORT )
});
