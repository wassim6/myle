var express = require('express');
var passport = require('passport');
var Account = require('../models/Account');
var router = express.Router();



function createUser(req, res){
    
    var newa = {
        
        username : req.body.username,
        password : req.body.password,
        email : req.body.email,
        codePostale : req.body.codePostale,   
    };
	
	 Account.register(new Account(newa),
		function(err, account) {
			if (err) {
				return res.status(404).send("test!");
				}
				
			 passport.authenticate('local')(req, res, function () {
				res.json(account);
			 });
		});
	
};


function authetificationUser(req, res){
	
	 
		
			 passport.authenticate('local')(req, res, function () {
                 res.send("good!!");
				
			 });
            
		
	
};
module.exports = {
    createUser:createUser,
    authetificationUser:authetificationUser
};