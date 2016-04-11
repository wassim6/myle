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
    var body = req.body;
    Account.update({
            "_id": req.body.id
        }, {    
            "firstName": req.body.firstName,
            "lastName":body.lastName,
            "age":body.age,
            "tel":body.tel
        }, function(err, model) {
            if (err) res.status(400).send('error 66');
            else
                res.json({message: 'User successfully edited', code:0});
        });
};
function editInfo2(req, res){
    var body = req.body;
    Account.update({
            "_id": req.body.id
        }, {    
            "facebook": req.body.facebook,
            "google":body.google
        }, function(err, model) {
            if (err) res.status(400).send('error 66');
            else
                res.json({message: 'User successfully edited', code:0});
        });
};

function editInfoAdresse(req, res){
    var body = req.body;
    Account.update({
            "_id": req.body.id
        }, {    
            "gouvernera": body.gouvernera,
            "delegation": body.delegation,
            "adresse": body.adresse,
            "codePostale": body.codePostale
        }, function(err, model) {
            if (err) res.status(400).send('error 66');
            else
                res.json({message: 'User successfully edited', code:0});
        });
};



module.exports = {
    createUser:createUser,
    authetificationUser:authetificationUser,
    showInfo:showInfo,
    editInfo:editInfo,
    getUserByUsername:getUserByUsername,
    editInfo2:editInfo2,
    editInfoAdresse:editInfoAdresse
};