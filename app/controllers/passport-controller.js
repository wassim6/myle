var express = require('express');
var passport = require('passport');
var Account = require('../models/User');
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
			 passport.authenticate('local')(req, res, function (u) {
                 res.json(u);	
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

function getUserByUsername(req, res){
    Account.findOne({'username':req.params.username}, function(error, username) {
            if (error){
                console.error('Could not retrieve user b/c:', username);
                res.status(400).send('error');
            }
            res.json(username);
        });
};

function editInfo(req, res){
    var data = req.body;
    Account.update(new Account(data), req.body.password
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
    editInfo:editInfo,
    getUserByUsername:getUserByUsername
};