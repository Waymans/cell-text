// currently have to enable 'less secure' apps through gmail account
// looking at better/more secure options
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS
  }
});

var mailOptions = {
  from: process.env.EMAIL,
  to: process.env.CELL, // gateway of cellphone carrier since we are sending through email, 10digitnumber@mms.cricketwireless.net
  subject: 'Sending Email using Node.js',
  text: ''
}; 

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function(request, response) {
  response.sendFile(process.cwd() + '/views/index.html');
});

app.post('/send', (req,res) => {
  mailOptions.text = req.body.text;
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
      res.send('Message sent: '+req.body.text);
    }
  });
});

const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});