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
    Tag.findOne({'_id':request.params.id},function(error, tag) {
            if (error){
                console.error('Could not retrieve tag b/c:', error);
                response.status(400).send('error');
            }
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

function add(request, response){
  var tag = new Tag({name:request.body.name});
  tag.save(function(error) {
    if (error) { 
        console.error('Not able to create tag b/c:', error);
        response.status(400).json('error');
    }
    else{  
        response.json({message: 'Tag successfully created', code:0});
    }
  });
};

function edit(request, response){
    Tag.update({
            "_id": request.body._id
        }, {    
            "name": request.body.name
        }, function(err, model) {
            if (err) response.status(400).send('error');
            else
                response.json({message: 'Tag successfully edited', code:0});
        });
    /*Tag.findById(request.body._id,function(error, tag) {
        if (error){ response.status(400).send('error');}
        else{
            Tag.update({
                "_id": request.body._id
            }, {    
                "name": request.body.name
            }, function(err, model) {
                if (err) response.status(400).send('error');
                else
                    response.json({message: 'Tag successfully edited', code:0});
            });
        }
    });*/
};

function remove(request, response){
    Tag.remove({ _id: request.params._id }, function(error) {
    if (error) response.status(400).send('error');
    else
        response.json({message: 'Tag successfully deleted', code:0});
  })  
};


module.exports = {
    getAll:getAll,
    show:show,
    search:search,
    add:add,
    edit:edit,
    remove:remove
};