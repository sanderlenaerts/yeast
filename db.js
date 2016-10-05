var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/yeast', function(){
  console.log('mongodb connected');
});

require('./models/beer');
require('./models/user');
require('./models/review');
