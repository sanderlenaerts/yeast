
var router = require('express').Router();
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport();


var schema = {
 'name': {
    notEmpty: {
      value: true,
      errorMessage: "Name cannot be empty"
    }
  },
  'email':{
    isEmail: {
      errorMessage: 'E-mail must be of pattern user@domain.code'
    }
  },
  'message': {
    notEmpty: {
      value: true,
      errorMessage: "Message cannot be empty"
    }
  }
}


module.exports.sendMail = function(req, res) {
  var data = req.body;
  req.check(schema);

  var errors = req.validationErrors();

  if (errors){
    res.status(400).json(errors);
  }
  else {
    transporter.sendMail({
      from: data.email,
      to: 'sander.lenaerts@gmail.com',
      subject: '[Yeast!] - Contact form',
      text: data.message
    });

    res.status(200).json(data);
  }



};
