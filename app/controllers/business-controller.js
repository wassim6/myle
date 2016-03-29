var mongoose = require('mongoose');
var fs = require('fs');
var Business = require('../models/Business');
var Delegation = require('../models/Delegation');
var Gouvernera = require('../models/Gouvernera');
var Tag = require('../models/Tag');
var Schema = mongoose.Schema;


function findById(request, response){
    Business.findOne({'id':request.param.id},function(error, business) {
            if (error){
                console.error('Could not retrieve business b/c:', business);
                response.status(400).send('error');
            }
            response.json(business);
        }).populate("delegation").populate("gouvernera").populate('tag');
};

function add(request, response){
    var body=request.body;
    
  var business = new Business({
      name:body.name,
      description:body.description,
      tel:body.tel,
      fax:body.fax,
      longitude:body.longitude,
      latitude:body.latitude,
      adress:body.adress,
      gouvernera:body.gouvernera,
      delegation:body.delegation,
      category:body.category,
      sousCategory:body.sousCategory      
  });
  business.save(function(error) {
    if (error) { 
        console.error('Not able to create business b/c:', error);
        response.status(400).json('error');
    }
    else{  
        response.json({message: 'Business successfully created', code:0}, business);
    }
  });
};

function editBasicInfo(request, response){
    var body=request.body;
    Business.update({
            "id": request.param.id
        }, {    
            "name": request.body.name,
            "description":body.description,
            "tel":body.tel,
            "fax":body.fax,
            "category":body.category,
            "sousCategory":body.sousCategory
        }, function(err, model) {
            if (err) response.status(400).send('error 66');
            else
                response.json({message: 'Business successfully edited', code:0});
        });
};


function editAdress(request, response){
    var body=request.body;
    Business.update({
            "id": request.param.id
        }, {    
            "longitude":body.longitude,
            "latitude":body.latitude,
            "adress":body.adress,
            "gouvernera":body.gouvernera,
            "delegation":body.delegation,
        }, function(err, model) {
            if (err) response.status(400).send('error 66');
            else
                response.json({message: 'Business successfully edited', code:0});
        });
};

function addTagToBusiness(request, response){
    var body=request.body;
     Business.findOne({'id':request.param.id},function(error, business) {
            if (error){
                console.error('Could not retrieve business b/c:', business);
                response.status(400).send('error');
            }
            var test=0;
            for(var i=0;i<business.tag.length;i++){
                if(business.tag[i]==body.tag._id)
                    test=1;
            }
            if(test==0){
                business.tag.push(body.tag);
                business.save(function(error) {
                    if (error) { 
                        console.error('Not able to add tag b/c:', error);
                        response.status(400).send('error 68');
                    }
                    else{  
                        response.json({message: 'Tag successfully added', code:0});
                    }
                  });
            }
            else{
                response.status(400).send('error duplicate tag');
            }


        });
};

function removeTagToBusiness(request, response){
    var body=request.body;
    Business.findOneAndUpdate({id:request.param.id}, {
          $pull: {
            tag: body.tag._id
          }
        }
        , function(error, business) {
            if (error){
                console.error('Could not remove tag b/c:', business);
                response.status(400).send('error 69');
            }
            else{  
                    response.json({message: 'Tag successfully removed', code:0});
            }
    });
};

function remove(request, response){
    Business.remove({ id: request.params.id }, function(error) {
    if (error) response.status(400).send('erro 12');
    else
        response.json({message: 'Business successfully removed', code:0});
  })  
};


module.exports = {
    findById:findById,
    add:add,
    editBasicInfo:editBasicInfo,
    editAdress:editAdress,
    addTagToBusiness:addTagToBusiness,
    removeTagToBusiness:removeTagToBusiness,
    remove:remove
};