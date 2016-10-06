var mongoose = require('mongoose');
var Beer = mongoose.model('Beer');
var router = require('express').Router();
var Review = mongoose.model('Review');
var User = mongoose.model('User');

module.exports.deleteReview = function(req, res, next) {
  var id = req.body.id;

  console.log(id);

  Review.remove({_id: id}, function(err){
    if (err){
      res.status(500).json([{msg: "We were unable to delete the review"}]);
    }
    res.status(200).json([{msg: "The review was successfully removed"}]);
  })

}

module.exports.getReviews = function(req, res, next) {
  var userId = req.body.userId;

  User
  .findOne({ _id: userId })
  .populate({
    path: 'reviews',
    model: 'Review',
    populate: {
      path: 'beer',
      model: 'Beer'
    }
  })
  .exec(function (err, user) {
    if (err) {
      console.log(err);
    }

    res.status(200).json(user.reviews);


  });
}

module.exports.postReview = function(req, res, next) {

  var userId = req.body.user;
  var score = req.body.score;
  var beerId = req.body.beer;

  var beerObjectId = mongoose.Types.ObjectId(beerId);

  // Add review to list of reviews
  var review = new Review();
  review.beer = beerObjectId;
  review.user = userId;
  review.score = score;

  review.save(function(err){
    if (err && err.name == "MongoError" && err.code=="11000"){
      var error = new Error("You have already submitted a review for this beer.");
      error.status = 409;
      res.status(error.status).json([{msg: error.message}])
    }
    else if(err){
      next(err);
    }
    else{
      // Add ReviewId to user (in array of reviewIds)
      console.log('Updating user');
      User.update(
        {_id: userId},
        {$push: {reviews: review._id}}, function(err){
          if (err){
            console.log(err);
          }
        });
      console.log('Updating beer');
      Beer.update(
        {_id: beerObjectId},
        {$push: {reviews: review._id}}, function(err){
          if (err){
            console.log(err);
          }
        });

      res.status(201).json({'message': 'Review was added correctly'});
    }
  })





}
