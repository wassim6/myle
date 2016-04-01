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
	
	 Account.register(new Account(newa),req.body.password,
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

function showInfo(req, res){
  
    Account.findById(req.params.id,function(error, account) {
            if (error){
                console.error('Could not retrieve account b/c:', error);
                res.status(400).send('error');
            }
            res.json(account);
        });

};

function editInfo(req, res){
    Account.update({"_id": req.body._id},{"username": req.body.username},{"email": req.body.email}
        , function(err, model) {
            if (err) res.status(400).send('error');
            else
                res.json({message: 'account successfully edited', code:0});
                
        });
};



module.exports = {
    createUser:createUser,
    authetificationUser:authetificationUser,
    showInfo:showInfo,
    editInfo:editInfo
    
};