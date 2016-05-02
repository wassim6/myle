var express = require('express');
var passport = require('passport');
var fs = require('fs');
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
        }).populate("delegation").populate("gouvernera");
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

function editPassword(req, res){
   
    Account.find({"_id": req.body.id}, function(err, model) {
        
            if (err) {res.status(400).send('error 66');}
                model[0].setPassword(req.body.password, function(err,user){
                                    
                              user.local.password = user.generateHash(req.body.password);
                              user.save();
                });
                res.json({message: 'password successfully edited', code:0});
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

function editProfileImage(request, response){
    //var imageBuffer = decodeBase64Image(request.body.img);
    Account.findById(request.body.id,function(error, account) {
            if (error){
                console.error('Could not retrieve account b/c:', account);
                response.status(400).send('error img');
            }
            else{
                if(typeof(account.profileImage)!='undefined'){
                    if(account.profileImage!='default.png'){
                        fs.unlinkSync('public/img/user/'+account.profileImage);
                    }
                }
                var bitmap = new Buffer(request.body.img.base64, 'base64');
                var uri = Math.round(+new Date()/1000);  
                fs.writeFile('public/img/user/'+uri+'.'+request.body.img.filetype.split('/')[1], bitmap, function(err) {
                    if(err){
                        console.error('Could not save image b/c:', account);
                        response.status(400).send('error img 2');
                    }
                    else{
                        account.profileImage=uri+'.'+request.body.img.filetype.split('/')[1];
                        account.save(function(error) {
                            if (error) { 
                                console.error('Not able to update account b/c:', error);
                                response.status(400).json('error');
                            }
                            else{  
                                response.json({message: 'account successfully updated', code:0}, account);
                            }
                        });
                    }

                });
            }
        });
};



module.exports = {
    createUser:createUser,
    authetificationUser:authetificationUser,
    showInfo:showInfo,
    editInfo:editInfo,
    getUserByUsername:getUserByUsername,
    editInfo2:editInfo2,
    editInfoAdresse:editInfoAdresse,
    editProfileImage:editProfileImage,
    editPassword:editPassword
};