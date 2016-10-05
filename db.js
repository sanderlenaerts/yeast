var mongoose = require('mongoose');

var dbUri = 'mongodb://localhost/yeast';

if(process.env.NODE_ENV === "production"){
  dbUri = "mongodb://beer-user:beer-yeast@aws-us-east-1-portal.23.dblayer.com:15789/yeast"
}

mongoose.connect(dbUri, function(){
  console.log('mongodb connected');
});

require('./models/beer');
require('./models/user');
require('./models/review');
