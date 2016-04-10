var mongoose = require('mongoose');
var fs = require('fs');
var Business = require('../models/Business');
var Delegation = require('../models/Delegation');
var Gouvernera = require('../models/Gouvernera');
var Tag = require('../models/Tag');
var Comment = require('../models/Comment');
var User = require('../models/User');
var Schema = mongoose.Schema;


function findByRegion(request, response){
    Comment.find({}, function(error, comment) {
            if (error){
                console.error('Could not retrieve Comment b/c:', comment);
                response.status(400).send('error');
            }
            var cs=[];
            for(var i=0;i<comment.length;i++){
                if(comment[i].businessId.gouvernera==request.params.id)
                    cs.push(comment[i]);
            }
            response.json(cs);
        }).sort({created_at: -1}).populate("businessId").populate("userId");
};

function findNewBusiness(request, response){
    Business.find({gouvernera:request.params.id}, function(error, business) {
            if (error){
                console.error('Could not retrieve Combusinessment b/c:', business);
                response.status(400).send('error');
            }
            response.json(business);
        }).sort({created_at: -1}).limit(8);
};


module.exports = {
    findByRegion:findByRegion,
    findNewBusiness:findNewBusiness
};