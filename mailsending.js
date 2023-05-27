const express = require("express");
const { model } = require("mongoose");
var nodemailer = require('nodemailer');

function sendmail(email){var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'shashidhar.shivaraj715@gmail.com',
    pass: 'msaxenhfjpjcpuji'
  }
});

var mailOptions = {
  from: 'shashidhar.shivaraj715@gmail.com',
  to: email,
  subject: 'Sending Email using Node.js',
  text: 'http://localhost:3000/register/student'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
}
module.exports=sendmail;