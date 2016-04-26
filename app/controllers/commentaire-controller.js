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

function getAll(request, response){
    Comment.find({}, function(error, comment) {
            if (error){
                console.error('Could not retrieve Comment b/c:', comment);
                response.status(400).send('error');
            }
            response.json(comment);
        }).sort({created_at: -1}).populate("businessId").populate("userId");
};

function userStats(request, response){
/*    User.aggregate([
            {$group: {
                _id: {
                    date: {$date: "$created_at"}
                },
                count: {$sum: 1}
            }},
            {$project: {
                date: "$_id", // so this is the shorter way
                count: 1,
                _id: 0
            }},
            {$sort: {"date": 1} } // and this will sort based on your date
        ], function(error, users){
            console.log(users);
        });*/

    User.aggregate([
            {$group: {
                _id: {
                    year: {$year: "$created_at"},
                    month: {$month: "$created_at"},
                    day: {$dayOfMonth: "$created_at"}
                },
                count: {$sum: 1}
            }},
            {$project: {
                date: "$_id", // so this is the shorter way
                count: 1,
                _id: 0
            }},
            {$sort: {"date": 1} } // and this will sort based on your date
        ], function(error, users){
            response.json(users);
        });
};



module.exports = {
    findByRegion:findByRegion,
    findNewBusiness:findNewBusiness,
    getAll:getAll,
    userStats:userStats
};