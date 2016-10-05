var mongoose = require('mongoose');
var Beer = mongoose.model('Beer');
var router = require('express').Router();



module.exports.getBeers = function(req, res) {
  Beer.find()
  .exec(function(err, beers){
    if (err){
      return next(err);
    }
    res.json(beers);
  });

}

module.exports.getBeer = function(req, res) {
  var id = req.params.id;
  var objectId = mongoose.Types.ObjectId(id);
  Beer.findOne({_id: objectId})
  .exec(function(err, beer){
    if (err){
      return next(err);
    }
    res.json(beer);
  });

}
