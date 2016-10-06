var express = require('express');
var router = express.Router();

var ctrlAuth = require('./authentication');
var ctrlPost = require('./posts');
var ctrlBeers = require('./beers');
var ctrlMail = require('./mail');
var ctrlReview = require('./reviews')

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

//beers
router.get('/beers', ctrlBeers.getBeers);
router.get('/beers/:id', ctrlBeers.getBeer);

//reviews
router.post('/review/delete', ctrlReview.deleteReview);
router.post('/review', ctrlReview.postReview);
router.post('/reviews', ctrlReview.getReviews);

//mail
router.post('/mail', ctrlMail.sendMail);

module.exports = router;
