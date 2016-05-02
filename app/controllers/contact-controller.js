var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
// create reusable transporter object using the default SMTP transport
/*var ses = require('nodemailer-ses-transport');
var transporter = nodemailer.createTransport(ses({
    accessKeyId: "AWSACCESSKEY",
    secretAccessKey: "AWS/Secret/key",
    rateLimit: 5 // do not send more than 5 messages in a second
}));*/
var transporter = nodemailer.createTransport('smtp',{
  service: 'Gmail',
  auth: {
	user: 'falloussaf@gmail.com',
	pass: 'wassimboussettarim'
  }
});

exports.sendContact = function(req, res) {
// setup e-mail data with unicode symbols
var mailOptions = {
    "from" : req.body.email, // sender address
    "to" : 'rim.aifa@esprit.tn', // list of receivers
    "subject" : req.body.subject+'✔', // Subject line
    "html": req.body.html
};

// send mail with defined transport object
transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return console.log(error);
    }
    console.log('Message sent: ' + info.response);
});


};