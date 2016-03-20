var mongoose = require('mongoose');
var request = require('request');
var cheerio = require('cheerio');
var Tag = require('../models/Tag');
var Schema = mongoose.Schema; // allows us to create a constructor for our model


function getAll(request, response){
    Tag.find({},function(error, tags) {
            if (error) console.error('Could not retrieve tag b/c:', error);
            response.json(tags);
        });
};

function show(request, response){
    Tag.find({'_id':request.params.id},function(error, tag) {
            if (error) console.error('Could not retrieve tag b/c:', error);
            response.json(tag);
        });
};

function search(request, response){
    var res = request.query.q.replace(" ", "|");
    var re = new RegExp(res, 'i');
    Tag.find({'name':{'$regex': re} },function(error, tags) {
            if (error) console.error('Could not retrieve2 tag b/c:', error);
            response.json(tags);
        });
};

module.exports = {
    getAll:getAll,
    show:show,
    search:search
};