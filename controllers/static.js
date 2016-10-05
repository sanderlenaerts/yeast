var express = require('express')
var router = express.Router();
var path = require('path');

router.get('/', function(req, res){
  res.sendFile(path.join(__dirname, '../layouts/app.html'));
});

router.use('/bower_components', express.static(__dirname + '/../bower_components'));
router.use(express.static(path.join(__dirname, '/../assets')));
router.use(express.static(path.join(__dirname, '/../templates')));

module.exports = router;
