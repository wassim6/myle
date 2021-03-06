var mongoose = require('mongoose');
var fs = require('fs');
var Business = require('../models/Business');
var Coupon = require('../models/Coupon');
var Schema = mongoose.Schema;


function findByBusinessId(request, response){
    Coupon.find({'businessId':request.params.id}, function(error, coupon) {
            if (error){
                console.error('Could not retrieve coupon b/c:', coupon);
                response.status(400).send('error');
            }
            response.json(coupon);
        });//.populate("businessId");
};

function add(request, response){
    var body=request.body;
    

    var remise=100-((100*body.prix)/body.prixInitial);
    var prinicpalImage=Math.round(+new Date()/1000)+'.'+body.image.filetype.split('/')[1];
    var bitmap = new Buffer(body.image.base64, 'base64');
            fs.writeFile('public/img/cimg/'+prinicpalImage, bitmap, function(err) {
                    if(err){
                        console.error('Could not save image b/c:', business);
                        response.status(400).send('error img 2');
                    }
                });
    var imgs=[];
    if(body.couponImage instanceof Array ){
        for(var i=0;i<body.couponImage.length;i ++){
            var uri=Math.round(+new Date()/1000)+'-'+i+'.'+body.couponImage[i].filetype.split('/')[1];
            var bitmap = new Buffer(body.couponImage[i].base64, 'base64');
            fs.writeFile('public/img/cimg/'+uri, bitmap, function(err) {
                    if(err){
                        console.error('Could not save image b/c:', business);
                        response.status(400).send('error img 2');
                    }
                });
            imgs.push({uri:uri});
        }
    }

    var coupon = new Coupon({
      startDate:body.startDate,
      endDate:body.endDate,
      title:body.title,
      prixInitial:body.prixInitial,
      prix:body.prix,
      remise:remise,
      description:body.description,
      condition:body.condition,
      businessId:body.businessId,
      image:prinicpalImage,
      couponImage:imgs
    });
  coupon.save(function(error) {
    if (error) { 
        console.error('Not able to create coupon b/c:', error);
        response.status(400).json('error');
    }
    else{  
        response.json({message: 'coupon successfully created', code:coupon});
    }
  });
};

function getById(request, response){
    Coupon.findById(request.params.id, function(error, coupon){
        if (error) response.status(400).send('error 11');
        else
            response.json(coupon);
    }).populate('businessId');
}

function remove(request, response){
    Coupon.remove({ _id: request.params.id }, function(error) {
    if (error) response.status(400).send('erro 12');
    else
        response.json({message: 'Coupon successfully removed', code:0});
    });
}

function getLast4(request, response){
    Coupon.find({'endDate':{$gte:new Date()}}, function(error, coupon){
        if (error) response.status(400).send('error 11');
        else
            response.json(coupon);
    }).populate('businessId').sort({created_at:-1}).limit(4);
}

// function to create file from base64 encoded string
function base64_decode(base64str, file) {
    var bitmap = new Buffer(base64str, 'base64');
    fs.writeFileSync(file, bitmap);
    console.log('******** File created from base64 encoded string ********');
}

function isEmpty( o ) {
    for ( var p in o ) { 
        if ( o.hasOwnProperty( p ) ) { return false; }
    }
    return true;
}

module.exports = {
    add:add,
    findByBusinessId:findByBusinessId,
    remove:remove,
    getById:getById,
    getLast4:getLast4
};