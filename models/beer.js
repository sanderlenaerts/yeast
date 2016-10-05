var db = require('../db');
var mongoose = require('mongoose');


var beer = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  abv: {
    type: String,
    required: true,
  },

  label: {
    type: String
  },

  description: {
    type: String,
    default: "No description available for this beer"
  },
  reviews: [{type: [mongoose.Schema.Types.ObjectId], ref: 'Review'}]

});

mongoose.model('Beer', beer);
