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

review.pre('remove', function(next){
  this.model('User').update({},{ $pull: {
    reviews: this._id} }, {multi: true}, next);
  this.model('Beer').update({},{ $pull: {
    reviews: this._id} }, {multi: true}, next);
});

review.index({ beer: 1, user: 1}, { unique: true });

mongoose.model('Review', review);
