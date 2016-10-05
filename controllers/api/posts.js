// var mongoose = require('mongoose');
// var Post = mongoose.model('Post');
// var router = require('express').Router();
//
//
// module.exports.addPost = function(req, res, next) {
//
//   var post = new Post({
//     username: req.body.name,
//     body: req.body.body
//   });
//
//   post.save(function(err, post){
//     if (err){
//       return next(err);
//     }
//     res.status(201).json(post);
//   });
//
// };
//
// module.exports.getPosts = function(req, res) {
//   Post.find()
//   .sort('-date')
//   .exec(function(err, posts){
//     if (err){
//       return next(err);
//     }
//     res.json(posts);
//   });
//
// };
