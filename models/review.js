var db = require('../db');
var mongoose = require('mongoose');


var review = new mongoose.Schema({

  beer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Beer',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  score: {
    type: String,
    required: true
  }
});

review.index({ beer: 1, user: 1}, { unique: true });

mongoose.model('Review', review);
