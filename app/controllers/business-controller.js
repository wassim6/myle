var mongoose = require('mongoose');
var fs = require('fs');
var Business = require('../models/Business');
var Delegation = require('../models/Delegation');
var Gouvernera = require('../models/Gouvernera');
var Tag = require('../models/Tag');
var Schema = mongoose.Schema;


function findById(request, response){
    Business.findById(request.params.id, function(error, business) {
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
            "id": request.params.id
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
            "_id": request.params.id
        }, {    
            "longitude":body.longitude,
            "latitude":body.latitude,
            "adress":body.adress,
            "gouvernera":body.gouvernera,
            "delegation":body.delegation,
        }, function(err, model) {
            if (err) response.status(400).send('error 66');
            else
                response.json({message: 'Business successfully edited', code:model});
        });
};

function addTagToBusiness(request, response){
    var body=request.body;
     Business.findOne({'_id':request.params.id},function(error, business) {
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
    Business.findOneAndUpdate({_id:request.params.id}, {
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
    Business.remove({ _id: request.params.id }, function(error) {
    if (error) response.status(400).send('erro 12');
    else
        response.json({message: 'Business successfully removed', code:0});
  })  
};

function editProfileImage(request, response){
    //var imageBuffer = decodeBase64Image(request.body.img);
    Business.findById(request.params.id,function(error, business) {
            if (error){
                console.error('Could not retrieve business b/c:', business);
                response.status(400).send('error img');
            }
            else{
                if(typeof(business.profileImage)!='undefined'){
                    if(business.profileImage!='default.png' && business.profileImage!='medecin.png' 
                    && business.profileImage!='pharmacie.png' ){
                        fs.unlinkSync('public/img/bimg/'+business.profileImage);
                    }
                }
                var bitmap = new Buffer(request.body.img, 'base64');
                var uri = Math.round(+new Date()/1000);  
                fs.writeFile('public/img/bimg/'+uri+'.'+request.body.extention, bitmap, function(err) {
                    if(err){
                        console.error('Could not save image b/c:', business);
                        response.status(400).send('error img 2');
                    }
                    else{
                        business.profileImage=uri+'.'+request.body.extention;
                        business.save(function(error) {
                            if (error) { 
                                console.error('Not able to update business b/c:', error);
                                response.status(400).json('error');
                            }
                            else{  
                                response.json({message: 'Business successfully updated', code:0}, business);
                            }
                        });
                    }

                });
            }
        });
};

function editCoverImage(request, response){
    //var imageBuffer = decodeBase64Image(request.body.img);
    Business.findById(request.params.id,function(error, business) {
            if (error){
                console.error('Could not retrieve business b/c:', business);
                response.status(400).send('error img');
            }
            else{
                if(typeof(business.coverImage)!='undefined'){
                    if(business.coverImage!='cover.jpg' ){
                        fs.unlinkSync('public/img/bimg/'+business.coverImage);
                    }
                }
                var bitmap = new Buffer(request.body.img, 'base64');
                var uri = Math.round(+new Date()/1000);  
                fs.writeFile('public/img/bimg/'+uri+'.'+request.body.extention, bitmap, function(err) {
                    if(err){
                        console.error('Could not save image b/c:', business);
                        response.status(400).send('error img 22');
                    }
                    else{
                        business.coverImage=uri+'.'+request.body.extention;
                        business.save(function(error) {
                            if (error) { 
                                console.error('Not able to update business b/c:', error);
                                response.status(400).json('error');
                            }
                            else{  
                                response.json({message: 'Business successfully updated', code:0}, business);
                            }
                        });
                    }

                });
            }
        });
};

function addImage(request, response){
    //var imageBuffer = decodeBase64Image(request.body.img);
    Business.findById(request.params.id,function(error, business) {
            if (error){
                console.error('Could not retrieve business b/c:', business);
                response.status(400).send('error img');
            }
            else{
                var bitmap = new Buffer(request.body.img, 'base64');
                var tmp = Math.round(+new Date()/1000);  
                fs.writeFile('public/img/bimg/'+tmp+'.'+request.body.extention, bitmap, function(err) {
                    if(err){
                        console.error('Could not save image b/c:', business);
                        response.status(400).send('error img 22');
                    }
                    else{
                        business.businessImage.push({uri:tmp+'.'+request.body.extention});
                        business.save(function(error) {
                            if (error) { 
                                console.error('Not able to update business b/c:', error);
                                response.status(400).json('error');
                            }
                            else{  
                                response.json({message: 'Business successfully updated', code:0}, business);
                            }
                        });
                    }

                });
            }
        });
};

function removeImage(request, response){
    Business.findById(request.params.id,function(error, business) {
            if (error){
                console.error('Could not retrieve business b/c:', business);
                response.status(400).send('error img');
            }
            else{
                for(var i=0;i<business.businessImage.length;i++){
                    if(business.businessImage[i].uri==request.body.uri){
                        business.businessImage.splice(i, 1);
                        i=business.businessImage.length+1;
                    }
                }
                business.save(function(error) {
                    if (error) { 
                        console.error('Not able to update business b/c:', error);
                        response.status(400).json('error');
                    }
                    else{
                        fs.unlink('public/img/bimg/'+request.body.uri);
                        response.json({message: 'Business successfully updated', code:business});
                    }
            });
        }
});
};

function editInfoView1(request, response){
    Business.findById(request.params.id, function(error, business) {
            if (error){
                console.error('Could not retrieve business b/c:', business);
                response.status(400).send('error');
            }
            else{
                business.tel=request.body.tel;
                business.fax=request.body.fax;
                business.email=request.body.email;
                business.site=request.body.site;
                business.facebook=request.body.facebook;
                business.googleplus=request.body.googleplus;
                business.save(function(error) {
                    if (error) { 
                        console.error('Not able to update business b/c:', error);
                        response.status(400).json('error');
                    }
                    else{  
                        response.json({message: 'Business successfully updated', code:business});
                    }
                });
            }
    });
};

function editInfoView2(request, response){
    Business.findById(request.params.id, function(error, business) {
            if (error){
                console.error('Could not retrieve business b/c:', business);
                response.status(400).send('error');
            }
            else{
                business.cnam=request.body.cnam;
                business.appointment=request.body.appointment;
                business.clim=request.body.clim;
                business.creditCard=request.body.creditCard;
                business.delivery=request.body.delivery;
                business.reservation=request.body.reservation;
                business.takeAway=request.body.takeAway;
                business.terrace=request.body.terrace;
                business.ticketsRestau=request.body.ticketsRestau;
                business.fauteuilRoulant=request.body.fauteuilRoulant;
                business.adapteEnfants=request.body.adapteEnfants;
                business.adapteGroupe=request.body.adapteGroupe;
                business.television=request.body.television;
                business.chiensAutorises=request.body.chiensAutorises;
                business.wifi=request.body.wifi;
                business.alcool=request.body.alcool;
                business.happyHour=request.body.happyHour;
                business.fumeur=request.body.fumeur;
                business.espaceNonFumeur=request.body.espaceNonFumeur;
                business.serviceADomicile=request.body.serviceADomicile;
                business.save(function(error) {
                    if (error) { 
                        console.error('Not able to update business b/c:', error);
                        response.status(400).json('error');
                    }
                    else{  
                        response.json({message: 'Business successfully updated', code:business});
                    }
                });
            }
    });
};

function editInfoView3(request, response){
    Business.findById(request.params.id, function(error, business) {
            if (error){
                console.error('Could not retrieve business b/c:', business);
                response.status(400).send('error');
            }
            else{
                business.budget=request.body.budget;
                business.budgetRange=request.body.budgetRange;
                business.save(function(error) {
                    if (error) { 
                        console.error('Not able to update business b/c:', error);
                        response.status(400).json('error');
                    }
                    else{  
                        response.json({message: 'Business successfully updated', code:business});
                    }
                });
            }
    });
};


function addOpeningHourToBusiness(request, response){
    var body=request.body;
     Business.findById(request.params.id,function(error, business) {
            if (error){
                console.error('Could not retrieve business b/c:', business);
                response.status(400).send('error');
            }
            business.openingTime.push({
                dayNumber:body.dayNumber,
                openingHour:body.openingHour,
                closingHour:body.closingHour,
                open:body.open
            });
            business.save(function(error) {
                if (error) { 
                    console.error('Not able to add opening hour b/c:', error);
                    response.status(400).send('error 68');
                }
                else{  
                    response.json(business);
                }
              });


        });
};

function removeOpeningHourBusiness(request, response){
    var body=request.body;
    Business.findOneAndUpdate({_id:request.params.id}, {
          $pull: {
            openingTime: body.openingTime
          }
        }
        , function(error, business) {
            if (error){
                console.error('Could not remove openingTime b/c:', business);
                response.status(400).send('error 69');
            }
            else{  
                    response.json({message: 'openingTime successfully removed', code:0});
            }
    });
};

function editOpeningHourToBusiness(request, response){
    var body=request.body;
     Business.findById(request.params.id,function(error, business) {
            if (error){
                console.error('Could not retrieve business b/c:', business);
                response.status(400).send('error');
            }
            for(var i=0;i<business.openingTime.length;i++){
                if(business.openingTime[i]._id==body.idOpen){
                    business.openingTime[i].dayNumber=body.dayNumber;
                    business.openingTime[i].openingHour=body.openingHour;
                    business.openingTime[i].closingHour=body.closingHour;
                    business.openingTime[i].open=body.open;
                    i=business.openingTime.length+1;
                }
            }
            business.save(function(error) {
                if (error) { 
                    console.error('Not able to edit opening hour b/c:', error);
                    response.status(400).send('error 68');
                }
                else{  
                    response.json({message: 'opening day successfully added', code:0});
                }
              });


        });
};


function findAllByCat(request, response){
    Business.find({
            'category': request.body.category
            //'category': { $in: ['Pharmacie','Medecin']}
        },'_id sousCategory name tel created_at rate gouvernera delegation'
        ,function(error, business) {
        if (error) console.error('Could not retrieve business b/c:', error);
        response.json({business:business});
      }).populate("delegation").populate("gouvernera"); 
};


//###### Tools #####################
function decodeBase64Image(dataString) {
  var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
    response = {};

  if (matches.length !== 3) {
    return new Error('Invalid input string');
  }

  response.type = matches[1];
  response.data = new Buffer(matches[2], 'base64');

  return response;
}

// function to create file from base64 encoded string
function base64_decode(base64str, file) {
    // create buffer object from base64 encoded string, it is important to tell the constructor that the string is base64 encoded
    var bitmap = new Buffer(base64str, 'base64');
    // write buffer to file
    fs.writeFileSync(file, bitmap);
    console.log('******** File created from base64 encoded string ********');
}

module.exports = {
    findById:findById,
    add:add,
    editBasicInfo:editBasicInfo,
    editAdress:editAdress,
    addTagToBusiness:addTagToBusiness,
    removeTagToBusiness:removeTagToBusiness,
    remove:remove,
    editProfileImage:editProfileImage,
    editCoverImage:editCoverImage,
    addImage:addImage,
    removeImage:removeImage,
    editInfoView1:editInfoView1,
    editInfoView2:editInfoView2,
    editInfoView3:editInfoView3,
    addOpeningHourToBusiness:addOpeningHourToBusiness,
    removeOpeningHourBusiness:removeOpeningHourBusiness,
    editOpeningHourToBusiness:editOpeningHourToBusiness,
    findAllByCat:findAllByCat
};