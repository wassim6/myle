var mongoose = require('mongoose');
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var Business = require('../models/Business');
var Delegation = require('../models/Delegation');
var Gouvernera = require('../models/Gouvernera');
var Tag = require('../models/Tag');
var Schema = mongoose.Schema; // allows us to create a constructor for our model


function scrapeAlimentation(request2, response2) {
    //max:874
    var debut=0;
    var fin=26;
    
    go();
    
    function go(){
        debut++;
        if(debut>fin){
            response2.json("finish");
            return;
        }
        else
        {
        request.post({
          headers: {'content-type' : 'multipart/form-data; boundary=----WebKitFormBoundaryUo8aX5tAuE19CcSX'},
          url:     'http://www.bonnes-adresses.tn/adresses-sante-a-tunisie.html?enticache=0.44762341329109634&api=pagination',
          body:'------WebKitFormBoundaryUo8aX5tAuE19CcSX\nContent-Disposition: form-data; name="jsonDataApiTransfert\n\n{"page":'+debut+',"filter":{"categorie":"1","ville":"Tunisie"}}\n------WebKitFormBoundaryUo8aX5tAuE19CcSX--'
        }, function(error, response, body)
         {
            body=JSON.parse(body);
            body=body.master_data.data;
            var i=0;
            step();
            function step(){
                var current=body[i];

                var name=current.titre;
                var adress=current.adresse;
                var description=current.description;
                var tel=current.tel;
                var email=current.email;
                var site=current.site;
                var facebook=current.facebook;
                var googleplus=current.googleplus;
                if(typeof(current.marker!='undefined'))
                {   var longitude=current.marker[0];
                    if(longitude!=0)
                        var latitude=current.marker[1];
                    else
                        var latitude=0;
                }
                var sousCategory=current.categorie;
                var category='Alimentation';

                if(current.service_a_domicile==0)
                    var serviceADomicile=false;
                else
                    var serviceADomicile=true;
                var gouv=current.ville;
                var urlScrape=current.url;
                var delegationCode=current.cp;
                var profileImage=current.photo;
                if(profileImage.indexOf('no_photo')!=-1 || profileImage.indexOf('gravatar')!=-1){
                    profileImage='default.png';
                }
                else{
                    var uri = Math.round(+new Date()/1000);  
                    profileImage=uri+'.jpg';
                    request(current.photo, {encoding: 'binary'}, function(error, response, bodyImg) {
                      fs.writeFile('public/img/bimg/'+profileImage, bodyImg, 'binary', function (err) {});
                    });
                }
                var openingTime=[];
                if(current.j1s==0){
                    openingTime.push({dayNumber:0, open:0});
                }
                else{
                    if(current.j1s1de!="" && current.j1s1a!=""){
                        var s1de=myConvert(current.j1s1de);
                        var s1a=myConvert(current.j1s1a);
                        if( !( isNaN(s1de) || isNaN(s1a) ))
                            openingTime.push({dayNumber:0, open:1, openingHour:s1de, closingHour:s1a});
                        if(current.j1s2de!="" && current.j1s2a!=""){
                            var s2de=myConvert(current.j1s2de);
                            var s2a=myConvert(current.j1s2a);
                            if( !( isNaN(s2de) || isNaN(s2a) ))
                                openingTime.push({dayNumber:0, open:1, openingHour:s2de, closingHour:s2a});
                    }
                    }
                    else
                    {
                        openingTime.push({dayNumber:0, open:1, openingHour:null, closingHour:null});
                    }
                }

                if(current.j2s==0){
                    openingTime.push({dayNumber:1, open:0});
                }
                else{
                    if(current.j2s1de!="" && current.j2s1a!=""){
                        var s1de=myConvert(current.j2s1de);
                        var s1a=myConvert(current.j2s1a);
                        if( !( isNaN(s1de) || isNaN(s1a) ))
                            openingTime.push({dayNumber:1, open:1, openingHour:s1de, closingHour:s1a});
                        if(current.j2s2de!="" && current.j2s2a!="" ){
                            var s2de=myConvert(current.j2s2de);
                            var s2a=myConvert(current.j2s2a);
                            if( !( isNaN(s2de) || isNaN(s2a) ))
                                openingTime.push({dayNumber:1, open:1, openingHour:s2de, closingHour:s2a});
                        }
                    }
                    else
                    {
                        openingTime.push({dayNumber:1, open:1, openingHour:null, closingHour:null});
                    }
                }

                if(current.j3s==0){
                    openingTime.push({dayNumber:2, open:0});
                }
                else{
                    if(current.j3s1de!="" && current.j3s1a!="" ){
                        var s1de=myConvert(current.j3s1de);
                        var s1a=myConvert(current.j3s1a);
                        if( !( isNaN(s1de) || isNaN(s1a) ))
                            openingTime.push({dayNumber:2, open:1, openingHour:s1de, closingHour:s1a});
                        if(current.j3s2de!="" && current.j3s2a!="" ){
                            var s2de=myConvert(current.j3s2de);
                            var s2a=myConvert(current.j3s2a);
                            if( !( isNaN(s2de) || isNaN(s2a) ))
                                openingTime.push({dayNumber:2, open:1, openingHour:s2de, closingHour:s2a});
                        }
                    }
                    else
                    {
                        openingTime.push({dayNumber:2, open:1, openingHour:null, closingHour:null});
                    }
                }

                if(current.j4s==0){
                    openingTime.push({dayNumber:3, open:0});
                }
                else{
                    if(current.j4s1de!="" && current.j4s1a!="" ){
                        var s1de=myConvert(current.j4s1de);
                        var s1a=myConvert(current.j4s1a);
                        if( !( isNaN(s1de) || isNaN(s1a) ))
                            openingTime.push({dayNumber:3, open:1, openingHour:s1de, closingHour:s1a});
                        if(current.j4s2de!="" && current.j4s2a!="" ){
                            var s2de=myConvert(current.j4s2de);
                            var s2a=myConvert(current.j4s2a);
                            if( !( isNaN(s2de) || isNaN(s2a) ))
                                openingTime.push({dayNumber:3, open:1, openingHour:s2de, closingHour:s2a});
                        }
                    }
                    else
                    {
                        openingTime.push({dayNumber:3, open:1, openingHour:null, closingHour:null});
                    }
                }

                if(current.j5s==0){
                    openingTime.push({dayNumber:4, open:0});
                }
                else{
                    if(current.j5s1de!="" && current.j5s1a!="" ){
                        var s1de=myConvert(current.j5s1de);
                        var s1a=myConvert(current.j5s1a);
                        if( !( isNaN(s1de) || isNaN(s1a) ))
                            openingTime.push({dayNumber:4, open:1, openingHour:s1de, closingHour:s1a});
                        if(current.j5s2de!="" && current.j5s2a!="" ){
                            var s2de=myConvert(current.j5s2de);
                            var s2a=myConvert(current.j5s2a);
                            if( !( isNaN(s2de) || isNaN(s2a) ))
                                openingTime.push({dayNumber:4, open:1, openingHour:s2de, closingHour:s2a});
                        }
                    }
                    else
                    {
                        openingTime.push({dayNumber:4, open:1, openingHour:null, closingHour:null});
                    }
                }

                if(current.j6s==0){
                    openingTime.push({dayNumber:5, open:0});
                }
                else{
                    if(current.j6s1de!="" && current.j6s1a!="" ){
                        var s1de=myConvert(current.j6s1de);
                        var s1a=myConvert(current.j6s1a);
                        if( !( isNaN(s1de) || isNaN(s1a) ))
                            openingTime.push({dayNumber:5, open:1, openingHour:s1de, closingHour:s1a});
                        if(current.j6s2de!="" && current.j6s2a!="" ){
                            var s2de=myConvert(current.j6s2de);
                            var s2a=myConvert(current.j6s2a);
                            if( !( isNaN(s2de) || isNaN(s2a) ))
                                openingTime.push({dayNumber:5, open:1, openingHour:s2de, closingHour:s2a});
                        }
                    }
                    else
                    {
                        openingTime.push({dayNumber:5, open:1, openingHour:null, closingHour:null});
                    }
                }

                if(current.j7s==0){
                    openingTime.push({dayNumber:6, open:0});
                }
                else{
                    if(current.j7s1de!="" && current.j7s1a!="" ){
                        var s1de=myConvert(current.j7s1de);
                        var s1a=myConvert(current.j7s1a);
                        if( !( isNaN(s1de) || isNaN(s1a) ))
                            openingTime.push({dayNumber:6, open:1, openingHour:s1de, closingHour:s1a});
                        if(current.j7s2de!="" && current.j7s2a!="" ){
                            var s2de=myConvert(current.j7s2de);
                            var s2a=myConvert(current.j7s2a);
                            if( !( isNaN(s2de) || isNaN(s2a) ))
                                openingTime.push({dayNumber:6, open:1, openingHour:s2de, closingHour:s2a});
                        }
                    }
                    else
                    {
                        openingTime.push({dayNumber:6, open:1, openingHour:null, closingHour:null});
                    }
                }


                var gId=0;
                var dId=0;
                var tags=[];
                Gouvernera.find({'name':gouv}, function(err, docs){
                            if(docs.length>0){
                                gId=docs[0].id;
                                if(delegationCode!=0)
                                    delegationFn();
                                else
                                    tagFn();
                            }
                            else{
                                 var g = new Gouvernera({name:gouv});
                                 g.save(function(error){
                                    if (error) console.error('Not able to add gouvernera:', error);
                                    else {
                                        gId=g.id; 
                                        if(delegationCode!=0)
                                            delegationFn();
                                        else
                                            tagFn();
                                    }
                                });
                            }
                        });

                function delegationFn(){
                            Delegation.find({'postCode':delegationCode}, function(err, docs){
                                //console.log(docs);
                                if(docs.length>0){
                                    dId=docs[0].id;
                                    tagFn();
                                }
                                else{
                                    var d = new Delegation({postCode:delegationCode});
                                    d.save(function(error){
                                        if (error) console.error('Not able to add delegation :', error);
                                        else {
                                            dId=d.id;
                                            tagFn();
                                        }
                                    });
                                }
                            });
                        };

                function tagFn(){                        
                    Tag.find({'name':category}, function(err, docs3){
                        if(docs3.length>0){
                            tags.push(docs3[0].id);
                            tag2Fn();
                        }
                        else{
                            var t = new Tag({name:category});
                            t.save(function(error){
                               if (error) console.error('Not able to add Tag :', error); 
                                tags.push(t.id);
                                tag2Fn();
                            });
                        }
                    });
                };

                function tag2Fn(){                        
                    Tag.find({'name':sousCategory}, function(err, docs3){
                        if(docs3.length>0){
                            tags.push(docs3[0].id);
                            businessFn();
                        }
                        else{
                            var t = new Tag({name:sousCategory});
                            t.save(function(error){
                               if (error) console.error('Not able to add Tag 2 :', error); 
                                tags.push(t.id);
                                businessFn();
                            });
                        }
                    });
                };

                function businessFn(){
                    //console.log("gId:"+gId+"   dId  "+dId+" profileImage:"+profileImage);
                    if(dId==0)
                        dId=null;
                    var b = new Business({
                        name:name, 
                        description:description,
                        tel:tel,
                        longitude:longitude,
                        latitude:latitude,
                        adress:adress,
                        gouvernera:gId,
                        delegation:dId,
                        tag:tags,
                        serviceADomicile:serviceADomicile,
                        category:category,
                        sousCategory:sousCategory,
                        email:email,
                        site:site,
                        facebook:facebook,
                        googleplus:googleplus,
                        openingTime:openingTime,
                        profileImage:profileImage,
                        urlScrape:urlScrape

                    });
                    tags=[];
                    openingTime=[];
                    b.save(function(error){
                        if (error) console.error('Not able to add business:', error);
                        else{
                            //console.log("Business Aded");
                        }
                    });



                    i++;
                    if(i<body.length){
                        step();
                    }
                    else
                        go();
                    //   response2.json(body);  

                };

            };
        });
        
        }
        };
    
    
    return;

};
function scrapeAnimaux(request2, response2) {
    //max:874
    var debut=0;
    var fin=5;
    
    go();
    
    function go(){
        debut++;
        if(debut>fin){
            response2.json("finish");
            return;
        }
        else
        {
        request.post({
          headers: {'content-type' : 'multipart/form-data; boundary=----WebKitFormBoundaryUo8aX5tAuE19CcSX'},
          url:     'http://www.bonnes-adresses.tn/adresses-sante-a-tunisie.html?enticache=0.44762341329109634&api=pagination',
          body:'------WebKitFormBoundaryUo8aX5tAuE19CcSX\nContent-Disposition: form-data; name="jsonDataApiTransfert\n\n{"page":'+debut+',"filter":{"categorie":"2","ville":"Tunisie"}}\n------WebKitFormBoundaryUo8aX5tAuE19CcSX--'
        }, function(error, response, body)
         {
            body=JSON.parse(body);
            body=body.master_data.data;
            var i=0;
            step();
            function step(){
                var current=body[i];

                var name=current.titre;
                var adress=current.adresse;
                var description=current.description;
                var tel=current.tel;
                var email=current.email;
                var site=current.site;
                var facebook=current.facebook;
                var googleplus=current.googleplus;
                var longitude=current.marker[0];
                if(longitude!=0)
                    var latitude=current.marker[1];
                else
                    var latitude=0;

                var sousCategory=current.categorie;
                var category='Animaux';

                if(current.service_a_domicile==0)
                    var serviceADomicile=false;
                else
                    var serviceADomicile=true;
                var gouv=current.ville;
                var urlScrape=current.url;
                var delegationCode=current.cp;
                var profileImage=current.photo;
                if(profileImage.indexOf('no_photo')!=-1 || profileImage.indexOf('gravatar')!=-1){
                    profileImage='default.png';
                }
                else{
                    var uri = Math.round(+new Date()/1000);  
                    profileImage=uri+'.jpg';
                    request(current.photo, {encoding: 'binary'}, function(error, response, bodyImg) {
                      fs.writeFile('public/img/bimg/'+profileImage, bodyImg, 'binary', function (err) {});
                    });
                }
                var openingTime=[];
                if(current.j1s==0){
                    openingTime.push({dayNumber:0, open:0});
                }
                else{
                    if(current.j1s1de!="" && current.j1s1a!=""){
                        var s1de=myConvert(current.j1s1de);
                        var s1a=myConvert(current.j1s1a);
                        if( !( isNaN(s1de) || isNaN(s1a) ))
                            openingTime.push({dayNumber:0, open:1, openingHour:s1de, closingHour:s1a});
                        if(current.j1s2de!="" && current.j1s2a!=""){
                            var s2de=myConvert(current.j1s2de);
                            var s2a=myConvert(current.j1s2a);
                            if( !( isNaN(s2de) || isNaN(s2a) ))
                                openingTime.push({dayNumber:0, open:1, openingHour:s2de, closingHour:s2a});
                    }
                    }
                    else
                    {
                        openingTime.push({dayNumber:0, open:1, openingHour:null, closingHour:null});
                    }
                }

                if(current.j2s==0){
                    openingTime.push({dayNumber:1, open:0});
                }
                else{
                    if(current.j2s1de!="" && current.j2s1a!=""){
                        var s1de=myConvert(current.j2s1de);
                        var s1a=myConvert(current.j2s1a);
                        if( !( isNaN(s1de) || isNaN(s1a) ))
                            openingTime.push({dayNumber:1, open:1, openingHour:s1de, closingHour:s1a});
                        if(current.j2s2de!="" && current.j2s2a!="" ){
                            var s2de=myConvert(current.j2s2de);
                            var s2a=myConvert(current.j2s2a);
                            if( !( isNaN(s2de) || isNaN(s2a) ))
                                openingTime.push({dayNumber:1, open:1, openingHour:s2de, closingHour:s2a});
                        }
                    }
                    else
                    {
                        openingTime.push({dayNumber:1, open:1, openingHour:null, closingHour:null});
                    }
                }

                if(current.j3s==0){
                    openingTime.push({dayNumber:2, open:0});
                }
                else{
                    if(current.j3s1de!="" && current.j3s1a!="" ){
                        var s1de=myConvert(current.j3s1de);
                        var s1a=myConvert(current.j3s1a);
                        if( !( isNaN(s1de) || isNaN(s1a) ))
                            openingTime.push({dayNumber:2, open:1, openingHour:s1de, closingHour:s1a});
                        if(current.j3s2de!="" && current.j3s2a!="" ){
                            var s2de=myConvert(current.j3s2de);
                            var s2a=myConvert(current.j3s2a);
                            if( !( isNaN(s2de) || isNaN(s2a) ))
                                openingTime.push({dayNumber:2, open:1, openingHour:s2de, closingHour:s2a});
                        }
                    }
                    else
                    {
                        openingTime.push({dayNumber:2, open:1, openingHour:null, closingHour:null});
                    }
                }

                if(current.j4s==0){
                    openingTime.push({dayNumber:3, open:0});
                }
                else{
                    if(current.j4s1de!="" && current.j4s1a!="" ){
                        var s1de=myConvert(current.j4s1de);
                        var s1a=myConvert(current.j4s1a);
                        if( !( isNaN(s1de) || isNaN(s1a) ))
                            openingTime.push({dayNumber:3, open:1, openingHour:s1de, closingHour:s1a});
                        if(current.j4s2de!="" && current.j4s2a!="" ){
                            var s2de=myConvert(current.j4s2de);
                            var s2a=myConvert(current.j4s2a);
                            if( !( isNaN(s2de) || isNaN(s2a) ))
                                openingTime.push({dayNumber:3, open:1, openingHour:s2de, closingHour:s2a});
                        }
                    }
                    else
                    {
                        openingTime.push({dayNumber:3, open:1, openingHour:null, closingHour:null});
                    }
                }

                if(current.j5s==0){
                    openingTime.push({dayNumber:4, open:0});
                }
                else{
                    if(current.j5s1de!="" && current.j5s1a!="" ){
                        var s1de=myConvert(current.j5s1de);
                        var s1a=myConvert(current.j5s1a);
                        if( !( isNaN(s1de) || isNaN(s1a) ))
                            openingTime.push({dayNumber:4, open:1, openingHour:s1de, closingHour:s1a});
                        if(current.j5s2de!="" && current.j5s2a!="" ){
                            var s2de=myConvert(current.j5s2de);
                            var s2a=myConvert(current.j5s2a);
                            if( !( isNaN(s2de) || isNaN(s2a) ))
                                openingTime.push({dayNumber:4, open:1, openingHour:s2de, closingHour:s2a});
                        }
                    }
                    else
                    {
                        openingTime.push({dayNumber:4, open:1, openingHour:null, closingHour:null});
                    }
                }

                if(current.j6s==0){
                    openingTime.push({dayNumber:5, open:0});
                }
                else{
                    if(current.j6s1de!="" && current.j6s1a!="" ){
                        var s1de=myConvert(current.j6s1de);
                        var s1a=myConvert(current.j6s1a);
                        if( !( isNaN(s1de) || isNaN(s1a) ))
                            openingTime.push({dayNumber:5, open:1, openingHour:s1de, closingHour:s1a});
                        if(current.j6s2de!="" && current.j6s2a!="" ){
                            var s2de=myConvert(current.j6s2de);
                            var s2a=myConvert(current.j6s2a);
                            if( !( isNaN(s2de) || isNaN(s2a) ))
                                openingTime.push({dayNumber:5, open:1, openingHour:s2de, closingHour:s2a});
                        }
                    }
                    else
                    {
                        openingTime.push({dayNumber:5, open:1, openingHour:null, closingHour:null});
                    }
                }

                if(current.j7s==0){
                    openingTime.push({dayNumber:6, open:0});
                }
                else{
                    if(current.j7s1de!="" && current.j7s1a!="" ){
                        var s1de=myConvert(current.j7s1de);
                        var s1a=myConvert(current.j7s1a);
                        if( !( isNaN(s1de) || isNaN(s1a) ))
                            openingTime.push({dayNumber:6, open:1, openingHour:s1de, closingHour:s1a});
                        if(current.j7s2de!="" && current.j7s2a!="" ){
                            var s2de=myConvert(current.j7s2de);
                            var s2a=myConvert(current.j7s2a);
                            if( !( isNaN(s2de) || isNaN(s2a) ))
                                openingTime.push({dayNumber:6, open:1, openingHour:s2de, closingHour:s2a});
                        }
                    }
                    else
                    {
                        openingTime.push({dayNumber:6, open:1, openingHour:null, closingHour:null});
                    }
                }


                var gId=0;
                var dId=0;
                var tags=[];
                Gouvernera.find({'name':gouv}, function(err, docs){
                            if(docs.length>0){
                                gId=docs[0].id;
                                if(delegationCode!=0)
                                    delegationFn();
                                else
                                    tagFn();
                            }
                            else{
                                 var g = new Gouvernera({name:gouv});
                                 g.save(function(error){
                                    if (error) console.error('Not able to add gouvernera:', error);
                                    else {
                                        gId=g.id; 
                                        if(delegationCode!=0)
                                            delegationFn();
                                        else
                                            tagFn();
                                    }
                                });
                            }
                        });

                function delegationFn(){
                            Delegation.find({'postCode':delegationCode}, function(err, docs){
                                //console.log(docs);
                                if(docs.length>0){
                                    dId=docs[0].id;
                                    tagFn();
                                }
                                else{
                                    var d = new Delegation({postCode:delegationCode});
                                    d.save(function(error){
                                        if (error) console.error('Not able to add delegation :', error);
                                        else {
                                            dId=d.id;
                                            tagFn();
                                        }
                                    });
                                }
                            });
                        };

                function tagFn(){                        
                    Tag.find({'name':category}, function(err, docs3){
                        if(docs3.length>0){
                            tags.push(docs3[0].id);
                            tag2Fn();
                        }
                        else{
                            var t = new Tag({name:category});
                            t.save(function(error){
                               if (error) console.error('Not able to add Tag :', error); 
                                tags.push(t.id);
                                tag2Fn();
                            });
                        }
                    });
                };

                function tag2Fn(){                        
                    Tag.find({'name':sousCategory}, function(err, docs3){
                        if(docs3.length>0){
                            tags.push(docs3[0].id);
                            businessFn();
                        }
                        else{
                            var t = new Tag({name:sousCategory});
                            t.save(function(error){
                               if (error) console.error('Not able to add Tag 2 :', error); 
                                tags.push(t.id);
                                businessFn();
                            });
                        }
                    });
                };

                function businessFn(){
                    //console.log("gId:"+gId+"   dId  "+dId+" profileImage:"+profileImage);
                    if(dId==0)
                        dId=null;
                    var b = new Business({
                        name:name, 
                        description:description,
                        tel:tel,
                        longitude:longitude,
                        latitude:latitude,
                        adress:adress,
                        gouvernera:gId,
                        delegation:dId,
                        tag:tags,
                        serviceADomicile:serviceADomicile,
                        category:category,
                        sousCategory:sousCategory,
                        email:email,
                        site:site,
                        facebook:facebook,
                        googleplus:googleplus,
                        openingTime:openingTime,
                        profileImage:profileImage,
                        urlScrape:urlScrape

                    });
                    tags=[];
                    openingTime=[];
                    b.save(function(error){
                        if (error) console.error('Not able to add business:', error);
                        else{
                            //console.log("Business Aded");
                        }
                    });



                    i++;
                    if(i<body.length){
                        step();
                    }
                    else
                        go();
                    //   response2.json(body);  

                };

            };
        });
        
        }
        };
    
    
    return;

};
function scrapeAutoMoto(request2, response2) {
    //max:874
    var debut=0;
    var fin=53;
    
    go();
    
    function go(){
        debut++;
        if(debut>fin){
            response2.json("finish");
            return;
        }
        else
        {
        request.post({
          headers: {'content-type' : 'multipart/form-data; boundary=----WebKitFormBoundaryUo8aX5tAuE19CcSX'},
          url:     'http://www.bonnes-adresses.tn/adresses-sante-a-tunisie.html?enticache=0.44762341329109634&api=pagination',
          body:'------WebKitFormBoundaryUo8aX5tAuE19CcSX\nContent-Disposition: form-data; name="jsonDataApiTransfert\n\n{"page":'+debut+',"filter":{"categorie":"163","ville":"Tunisie"}}\n------WebKitFormBoundaryUo8aX5tAuE19CcSX--'
        }, function(error, response, body)
         {
            body=JSON.parse(body);
            body=body.master_data.data;
            var i=0;
            step();
            function step(){
                var current=body[i];

                var name=current.titre;
                var adress=current.adresse;
                var description=current.description;
                var tel=current.tel;
                var email=current.email;
                var site=current.site;
                var facebook=current.facebook;
                var googleplus=current.googleplus;
                var longitude=current.marker[0];
                if(longitude!=0)
                    var latitude=current.marker[1];
                else
                    var latitude=0;

                var sousCategory=current.categorie;
                var category='Auto-Motos';

                if(current.service_a_domicile==0)
                    var serviceADomicile=false;
                else
                    var serviceADomicile=true;
                var gouv=current.ville;
                var urlScrape=current.url;
                var delegationCode=current.cp;
                var profileImage=current.photo;
                if(profileImage.indexOf('no_photo')!=-1 || profileImage.indexOf('gravatar')!=-1){
                    profileImage='default.png';
                }
                else{
                    var uri = Math.round(+new Date()/1000);  
                    profileImage=uri+'.jpg';
                    request(current.photo, {encoding: 'binary'}, function(error, response, bodyImg) {
                      fs.writeFile('public/img/bimg/'+profileImage, bodyImg, 'binary', function (err) {});
                    });
                }
                var openingTime=[];
                if(current.j1s==0){
                    openingTime.push({dayNumber:0, open:0});
                }
                else{
                    if(current.j1s1de!="" && current.j1s1a!=""){
                        var s1de=myConvert(current.j1s1de);
                        var s1a=myConvert(current.j1s1a);
                        if( !( isNaN(s1de) || isNaN(s1a) ))
                            openingTime.push({dayNumber:0, open:1, openingHour:s1de, closingHour:s1a});
                        if(current.j1s2de!="" && current.j1s2a!=""){
                            var s2de=myConvert(current.j1s2de);
                            var s2a=myConvert(current.j1s2a);
                            if( !( isNaN(s2de) || isNaN(s2a) ))
                                openingTime.push({dayNumber:0, open:1, openingHour:s2de, closingHour:s2a});
                    }
                    }
                    else
                    {
                        openingTime.push({dayNumber:0, open:1, openingHour:null, closingHour:null});
                    }
                }

                if(current.j2s==0){
                    openingTime.push({dayNumber:1, open:0});
                }
                else{
                    if(current.j2s1de!="" && current.j2s1a!=""){
                        var s1de=myConvert(current.j2s1de);
                        var s1a=myConvert(current.j2s1a);
                        if( !( isNaN(s1de) || isNaN(s1a) ))
                            openingTime.push({dayNumber:1, open:1, openingHour:s1de, closingHour:s1a});
                        if(current.j2s2de!="" && current.j2s2a!="" ){
                            var s2de=myConvert(current.j2s2de);
                            var s2a=myConvert(current.j2s2a);
                            if( !( isNaN(s2de) || isNaN(s2a) ))
                                openingTime.push({dayNumber:1, open:1, openingHour:s2de, closingHour:s2a});
                        }
                    }
                    else
                    {
                        openingTime.push({dayNumber:1, open:1, openingHour:null, closingHour:null});
                    }
                }

                if(current.j3s==0){
                    openingTime.push({dayNumber:2, open:0});
                }
                else{
                    if(current.j3s1de!="" && current.j3s1a!="" ){
                        var s1de=myConvert(current.j3s1de);
                        var s1a=myConvert(current.j3s1a);
                        if( !( isNaN(s1de) || isNaN(s1a) ))
                            openingTime.push({dayNumber:2, open:1, openingHour:s1de, closingHour:s1a});
                        if(current.j3s2de!="" && current.j3s2a!="" ){
                            var s2de=myConvert(current.j3s2de);
                            var s2a=myConvert(current.j3s2a);
                            if( !( isNaN(s2de) || isNaN(s2a) ))
                                openingTime.push({dayNumber:2, open:1, openingHour:s2de, closingHour:s2a});
                        }
                    }
                    else
                    {
                        openingTime.push({dayNumber:2, open:1, openingHour:null, closingHour:null});
                    }
                }

                if(current.j4s==0){
                    openingTime.push({dayNumber:3, open:0});
                }
                else{
                    if(current.j4s1de!="" && current.j4s1a!="" ){
                        var s1de=myConvert(current.j4s1de);
                        var s1a=myConvert(current.j4s1a);
                        if( !( isNaN(s1de) || isNaN(s1a) ))
                            openingTime.push({dayNumber:3, open:1, openingHour:s1de, closingHour:s1a});
                        if(current.j4s2de!="" && current.j4s2a!="" ){
                            var s2de=myConvert(current.j4s2de);
                            var s2a=myConvert(current.j4s2a);
                            if( !( isNaN(s2de) || isNaN(s2a) ))
                                openingTime.push({dayNumber:3, open:1, openingHour:s2de, closingHour:s2a});
                        }
                    }
                    else
                    {
                        openingTime.push({dayNumber:3, open:1, openingHour:null, closingHour:null});
                    }
                }

                if(current.j5s==0){
                    openingTime.push({dayNumber:4, open:0});
                }
                else{
                    if(current.j5s1de!="" && current.j5s1a!="" ){
                        var s1de=myConvert(current.j5s1de);
                        var s1a=myConvert(current.j5s1a);
                        if( !( isNaN(s1de) || isNaN(s1a) ))
                            openingTime.push({dayNumber:4, open:1, openingHour:s1de, closingHour:s1a});
                        if(current.j5s2de!="" && current.j5s2a!="" ){
                            var s2de=myConvert(current.j5s2de);
                            var s2a=myConvert(current.j5s2a);
                            if( !( isNaN(s2de) || isNaN(s2a) ))
                                openingTime.push({dayNumber:4, open:1, openingHour:s2de, closingHour:s2a});
                        }
                    }
                    else
                    {
                        openingTime.push({dayNumber:4, open:1, openingHour:null, closingHour:null});
                    }
                }

                if(current.j6s==0){
                    openingTime.push({dayNumber:5, open:0});
                }
                else{
                    if(current.j6s1de!="" && current.j6s1a!="" ){
                        var s1de=myConvert(current.j6s1de);
                        var s1a=myConvert(current.j6s1a);
                        if( !( isNaN(s1de) || isNaN(s1a) ))
                            openingTime.push({dayNumber:5, open:1, openingHour:s1de, closingHour:s1a});
                        if(current.j6s2de!="" && current.j6s2a!="" ){
                            var s2de=myConvert(current.j6s2de);
                            var s2a=myConvert(current.j6s2a);
                            if( !( isNaN(s2de) || isNaN(s2a) ))
                                openingTime.push({dayNumber:5, open:1, openingHour:s2de, closingHour:s2a});
                        }
                    }
                    else
                    {
                        openingTime.push({dayNumber:5, open:1, openingHour:null, closingHour:null});
                    }
                }

                if(current.j7s==0){
                    openingTime.push({dayNumber:6, open:0});
                }
                else{
                    if(current.j7s1de!="" && current.j7s1a!="" ){
                        var s1de=myConvert(current.j7s1de);
                        var s1a=myConvert(current.j7s1a);
                        if( !( isNaN(s1de) || isNaN(s1a) ))
                            openingTime.push({dayNumber:6, open:1, openingHour:s1de, closingHour:s1a});
                        if(current.j7s2de!="" && current.j7s2a!="" ){
                            var s2de=myConvert(current.j7s2de);
                            var s2a=myConvert(current.j7s2a);
                            if( !( isNaN(s2de) || isNaN(s2a) ))
                                openingTime.push({dayNumber:6, open:1, openingHour:s2de, closingHour:s2a});
                        }
                    }
                    else
                    {
                        openingTime.push({dayNumber:6, open:1, openingHour:null, closingHour:null});
                    }
                }


                var gId=0;
                var dId=0;
                var tags=[];
                Gouvernera.find({'name':gouv}, function(err, docs){
                            if(docs.length>0){
                                gId=docs[0].id;
                                if(delegationCode!=0)
                                    delegationFn();
                                else
                                    tagFn();
                            }
                            else{
                                 var g = new Gouvernera({name:gouv});
                                 g.save(function(error){
                                    if (error) console.error('Not able to add gouvernera:', error);
                                    else {
                                        gId=g.id; 
                                        if(delegationCode!=0)
                                            delegationFn();
                                        else
                                            tagFn();
                                    }
                                });
                            }
                        });

                function delegationFn(){
                            Delegation.find({'postCode':delegationCode}, function(err, docs){
                                //console.log(docs);
                                if(docs.length>0){
                                    dId=docs[0].id;
                                    tagFn();
                                }
                                else{
                                    var d = new Delegation({postCode:delegationCode});
                                    d.save(function(error){
                                        if (error) console.error('Not able to add delegation :', error);
                                        else {
                                            dId=d.id;
                                            tagFn();
                                        }
                                    });
                                }
                            });
                        };

                function tagFn(){                        
                    Tag.find({'name':category}, function(err, docs3){
                        if(docs3.length>0){
                            tags.push(docs3[0].id);
                            tag2Fn();
                        }
                        else{
                            var t = new Tag({name:category});
                            t.save(function(error){
                               if (error) console.error('Not able to add Tag :', error); 
                                tags.push(t.id);
                                tag2Fn();
                            });
                        }
                    });
                };

                function tag2Fn(){                        
                    Tag.find({'name':sousCategory}, function(err, docs3){
                        if(docs3.length>0){
                            tags.push(docs3[0].id);
                            businessFn();
                        }
                        else{
                            var t = new Tag({name:sousCategory});
                            t.save(function(error){
                               if (error) console.error('Not able to add Tag 2 :', error); 
                                tags.push(t.id);
                                businessFn();
                            });
                        }
                    });
                };

                function businessFn(){
                    //console.log("gId:"+gId+"   dId  "+dId+" profileImage:"+profileImage);
                    if(dId==0)
                        dId=null;
                    var b = new Business({
                        name:name, 
                        description:description,
                        tel:tel,
                        longitude:longitude,
                        latitude:latitude,
                        adress:adress,
                        gouvernera:gId,
                        delegation:dId,
                        tag:tags,
                        serviceADomicile:serviceADomicile,
                        category:category,
                        sousCategory:sousCategory,
                        email:email,
                        site:site,
                        facebook:facebook,
                        googleplus:googleplus,
                        openingTime:openingTime,
                        profileImage:profileImage,
                        urlScrape:urlScrape

                    });
                    tags=[];
                    openingTime=[];
                    b.save(function(error){
                        if (error) console.error('Not able to add business:', error);
                        else{
                            //console.log("Business Aded");
                        }
                    });



                    i++;
                    if(i<body.length){
                        step();
                    }
                    else
                        go();
                    //   response2.json(body);  

                };

            };
        });
        
        }
        };
    
    
    return;

};
function scrapeArtisans(request2, response2) {
    //max:874
    var debut=0;
    var fin=108;
    
    go();
    
    function go(){
        debut++;
        if(debut>fin){
            response2.json("finish");
            return;
        }
        else
        {
        request.post({
          headers: {'content-type' : 'multipart/form-data; boundary=----WebKitFormBoundaryUo8aX5tAuE19CcSX'},
          url:     'http://www.bonnes-adresses.tn/adresses-sante-a-tunisie.html?enticache=0.44762341329109634&api=pagination',
          body:'------WebKitFormBoundaryUo8aX5tAuE19CcSX\nContent-Disposition: form-data; name="jsonDataApiTransfert\n\n{"page":'+debut+',"filter":{"categorie":"3","ville":"Tunisie"}}\n------WebKitFormBoundaryUo8aX5tAuE19CcSX--'
        }, function(error, response, body)
         {
            body=JSON.parse(body);
            body=body.master_data.data;
            var i=0;
            step();
            function step(){
                var current=body[i];

                var name=current.titre;
                var adress=current.adresse;
                var description=current.description;
                var tel=current.tel;
                var email=current.email;
                var site=current.site;
                var facebook=current.facebook;
                var googleplus=current.googleplus;
                var longitude=current.marker[0];
                if(longitude!=0)
                    var latitude=current.marker[1];
                else
                    var latitude=0;

                var sousCategory=current.categorie;
                var category='Artisans';

                if(current.service_a_domicile==0)
                    var serviceADomicile=false;
                else
                    var serviceADomicile=true;
                var gouv=current.ville;
                var urlScrape=current.url;
                var delegationCode=current.cp;
                var profileImage=current.photo;
                if(profileImage.indexOf('no_photo')!=-1 || profileImage.indexOf('gravatar')!=-1){
                    profileImage='default.png';
                }
                else{
                    var uri = Math.round(+new Date()/1000);  
                    profileImage=uri+'.jpg';
                    request(current.photo, {encoding: 'binary'}, function(error, response, bodyImg) {
                      fs.writeFile('public/img/bimg/'+profileImage, bodyImg, 'binary', function (err) {});
                    });
                }
                var openingTime=[];
                if(current.j1s==0){
                    openingTime.push({dayNumber:0, open:0});
                }
                else{
                    if(current.j1s1de!="" && current.j1s1a!=""){
                        var s1de=myConvert(current.j1s1de);
                        var s1a=myConvert(current.j1s1a);
                        if( !( isNaN(s1de) || isNaN(s1a) ))
                            openingTime.push({dayNumber:0, open:1, openingHour:s1de, closingHour:s1a});
                        if(current.j1s2de!="" && current.j1s2a!=""){
                            var s2de=myConvert(current.j1s2de);
                            var s2a=myConvert(current.j1s2a);
                            if( !( isNaN(s2de) || isNaN(s2a) ))
                                openingTime.push({dayNumber:0, open:1, openingHour:s2de, closingHour:s2a});
                    }
                    }
                    else
                    {
                        openingTime.push({dayNumber:0, open:1, openingHour:null, closingHour:null});
                    }
                }

                if(current.j2s==0){
                    openingTime.push({dayNumber:1, open:0});
                }
                else{
                    if(current.j2s1de!="" && current.j2s1a!=""){
                        var s1de=myConvert(current.j2s1de);
                        var s1a=myConvert(current.j2s1a);
                        if( !( isNaN(s1de) || isNaN(s1a) ))
                            openingTime.push({dayNumber:1, open:1, openingHour:s1de, closingHour:s1a});
                        if(current.j2s2de!="" && current.j2s2a!="" ){
                            var s2de=myConvert(current.j2s2de);
                            var s2a=myConvert(current.j2s2a);
                            if( !( isNaN(s2de) || isNaN(s2a) ))
                                openingTime.push({dayNumber:1, open:1, openingHour:s2de, closingHour:s2a});
                        }
                    }
                    else
                    {
                        openingTime.push({dayNumber:1, open:1, openingHour:null, closingHour:null});
                    }
                }

                if(current.j3s==0){
                    openingTime.push({dayNumber:2, open:0});
                }
                else{
                    if(current.j3s1de!="" && current.j3s1a!="" ){
                        var s1de=myConvert(current.j3s1de);
                        var s1a=myConvert(current.j3s1a);
                        if( !( isNaN(s1de) || isNaN(s1a) ))
                            openingTime.push({dayNumber:2, open:1, openingHour:s1de, closingHour:s1a});
                        if(current.j3s2de!="" && current.j3s2a!="" ){
                            var s2de=myConvert(current.j3s2de);
                            var s2a=myConvert(current.j3s2a);
                            if( !( isNaN(s2de) || isNaN(s2a) ))
                                openingTime.push({dayNumber:2, open:1, openingHour:s2de, closingHour:s2a});
                        }
                    }
                    else
                    {
                        openingTime.push({dayNumber:2, open:1, openingHour:null, closingHour:null});
                    }
                }

                if(current.j4s==0){
                    openingTime.push({dayNumber:3, open:0});
                }
                else{
                    if(current.j4s1de!="" && current.j4s1a!="" ){
                        var s1de=myConvert(current.j4s1de);
                        var s1a=myConvert(current.j4s1a);
                        if( !( isNaN(s1de) || isNaN(s1a) ))
                            openingTime.push({dayNumber:3, open:1, openingHour:s1de, closingHour:s1a});
                        if(current.j4s2de!="" && current.j4s2a!="" ){
                            var s2de=myConvert(current.j4s2de);
                            var s2a=myConvert(current.j4s2a);
                            if( !( isNaN(s2de) || isNaN(s2a) ))
                                openingTime.push({dayNumber:3, open:1, openingHour:s2de, closingHour:s2a});
                        }
                    }
                    else
                    {
                        openingTime.push({dayNumber:3, open:1, openingHour:null, closingHour:null});
                    }
                }

                if(current.j5s==0){
                    openingTime.push({dayNumber:4, open:0});
                }
                else{
                    if(current.j5s1de!="" && current.j5s1a!="" ){
                        var s1de=myConvert(current.j5s1de);
                        var s1a=myConvert(current.j5s1a);
                        if( !( isNaN(s1de) || isNaN(s1a) ))
                            openingTime.push({dayNumber:4, open:1, openingHour:s1de, closingHour:s1a});
                        if(current.j5s2de!="" && current.j5s2a!="" ){
                            var s2de=myConvert(current.j5s2de);
                            var s2a=myConvert(current.j5s2a);
                            if( !( isNaN(s2de) || isNaN(s2a) ))
                                openingTime.push({dayNumber:4, open:1, openingHour:s2de, closingHour:s2a});
                        }
                    }
                    else
                    {
                        openingTime.push({dayNumber:4, open:1, openingHour:null, closingHour:null});
                    }
                }

                if(current.j6s==0){
                    openingTime.push({dayNumber:5, open:0});
                }
                else{
                    if(current.j6s1de!="" && current.j6s1a!="" ){
                        var s1de=myConvert(current.j6s1de);
                        var s1a=myConvert(current.j6s1a);
                        if( !( isNaN(s1de) || isNaN(s1a) ))
                            openingTime.push({dayNumber:5, open:1, openingHour:s1de, closingHour:s1a});
                        if(current.j6s2de!="" && current.j6s2a!="" ){
                            var s2de=myConvert(current.j6s2de);
                            var s2a=myConvert(current.j6s2a);
                            if( !( isNaN(s2de) || isNaN(s2a) ))
                                openingTime.push({dayNumber:5, open:1, openingHour:s2de, closingHour:s2a});
                        }
                    }
                    else
                    {
                        openingTime.push({dayNumber:5, open:1, openingHour:null, closingHour:null});
                    }
                }

                if(current.j7s==0){
                    openingTime.push({dayNumber:6, open:0});
                }
                else{
                    if(current.j7s1de!="" && current.j7s1a!="" ){
                        var s1de=myConvert(current.j7s1de);
                        var s1a=myConvert(current.j7s1a);
                        if( !( isNaN(s1de) || isNaN(s1a) ))
                            openingTime.push({dayNumber:6, open:1, openingHour:s1de, closingHour:s1a});
                        if(current.j7s2de!="" && current.j7s2a!="" ){
                            var s2de=myConvert(current.j7s2de);
                            var s2a=myConvert(current.j7s2a);
                            if( !( isNaN(s2de) || isNaN(s2a) ))
                                openingTime.push({dayNumber:6, open:1, openingHour:s2de, closingHour:s2a});
                        }
                    }
                    else
                    {
                        openingTime.push({dayNumber:6, open:1, openingHour:null, closingHour:null});
                    }
                }


                var gId=0;
                var dId=0;
                var tags=[];
                Gouvernera.find({'name':gouv}, function(err, docs){
                            if(docs.length>0){
                                gId=docs[0].id;
                                if(delegationCode!=0)
                                    delegationFn();
                                else
                                    tagFn();
                            }
                            else{
                                 var g = new Gouvernera({name:gouv});
                                 g.save(function(error){
                                    if (error) console.error('Not able to add gouvernera:', error);
                                    else {
                                        gId=g.id; 
                                        if(delegationCode!=0)
                                            delegationFn();
                                        else
                                            tagFn();
                                    }
                                });
                            }
                        });

                function delegationFn(){
                            Delegation.find({'postCode':delegationCode}, function(err, docs){
                                //console.log(docs);
                                if(docs.length>0){
                                    dId=docs[0].id;
                                    tagFn();
                                }
                                else{
                                    var d = new Delegation({postCode:delegationCode});
                                    d.save(function(error){
                                        if (error) console.error('Not able to add delegation :', error);
                                        else {
                                            dId=d.id;
                                            tagFn();
                                        }
                                    });
                                }
                            });
                        };

                function tagFn(){                        
                    Tag.find({'name':category}, function(err, docs3){
                        if(docs3.length>0){
                            tags.push(docs3[0].id);
                            tag2Fn();
                        }
                        else{
                            var t = new Tag({name:category});
                            t.save(function(error){
                               if (error) console.error('Not able to add Tag :', error); 
                                tags.push(t.id);
                                tag2Fn();
                            });
                        }
                    });
                };

                function tag2Fn(){                        
                    Tag.find({'name':sousCategory}, function(err, docs3){
                        if(docs3.length>0){
                            tags.push(docs3[0].id);
                            businessFn();
                        }
                        else{
                            var t = new Tag({name:sousCategory});
                            t.save(function(error){
                               if (error) console.error('Not able to add Tag 2 :', error); 
                                tags.push(t.id);
                                businessFn();
                            });
                        }
                    });
                };

                function businessFn(){
                    //console.log("gId:"+gId+"   dId  "+dId+" profileImage:"+profileImage);
                    if(dId==0)
                        dId=null;
                    var b = new Business({
                        name:name, 
                        description:description,
                        tel:tel,
                        longitude:longitude,
                        latitude:latitude,
                        adress:adress,
                        gouvernera:gId,
                        delegation:dId,
                        tag:tags,
                        serviceADomicile:serviceADomicile,
                        category:category,
                        sousCategory:sousCategory,
                        email:email,
                        site:site,
                        facebook:facebook,
                        googleplus:googleplus,
                        openingTime:openingTime,
                        profileImage:profileImage,
                        urlScrape:urlScrape

                    });
                    tags=[];
                    openingTime=[];
                    b.save(function(error){
                        if (error) console.error('Not able to add business:', error);
                        else{
                            //console.log("Business Aded");
                        }
                    });



                    i++;
                    if(i<body.length){
                        step();
                    }
                    else
                        go();
                    //   response2.json(body);  

                };

            };
        });
        
        }
        };
    
    
    return;

};
function scrapeSport(request2, response2) {
    //max:874
    var debut=0;
    var fin=6;
    
    go();
    
    function go(){
        debut++;
        if(debut>fin){
            response2.json("finish");
            return;
        }
        else
        {
        request.post({
          headers: {'content-type' : 'multipart/form-data; boundary=----WebKitFormBoundaryUo8aX5tAuE19CcSX'},
          url:     'http://www.bonnes-adresses.tn/adresses-sante-a-tunisie.html?enticache=0.44762341329109634&api=pagination',
          body:'------WebKitFormBoundaryUo8aX5tAuE19CcSX\nContent-Disposition: form-data; name="jsonDataApiTransfert\n\n{"page":'+debut+',"filter":{"categorie":"180","ville":"Tunisie"}}\n------WebKitFormBoundaryUo8aX5tAuE19CcSX--'
        }, function(error, response, body)
         {
            body=JSON.parse(body);
            body=body.master_data.data;
            var i=0;
            step();
            function step(){
                var current=body[i];

                var name=current.titre;
                var adress=current.adresse;
                var description=current.description;
                var tel=current.tel;
                var email=current.email;
                var site=current.site;
                var facebook=current.facebook;
                var googleplus=current.googleplus;
                if (current.marker && current.marker[0] )
                {   var longitude=current.marker[0];
                    if(longitude!=0)
                        var latitude=current.marker[1];
                    else
                        var latitude=0;
                }

                var sousCategory=current.categorie;
                var category='Sport';

                if(current.service_a_domicile==0)
                    var serviceADomicile=false;
                else
                    var serviceADomicile=true;
                var gouv=current.ville;
                var urlScrape=current.url;
                var delegationCode=current.cp;
                var profileImage=current.photo;
                if(profileImage.indexOf('no_photo')!=-1 || profileImage.indexOf('gravatar')!=-1){
                    profileImage='default.png';
                }
                else{
                    var uri = Math.round(+new Date()/1000);  
                    profileImage=uri+'.jpg';
                    request(current.photo, {encoding: 'binary'}, function(error, response, bodyImg) {
                      fs.writeFile('public/img/bimg/'+profileImage, bodyImg, 'binary', function (err) {});
                    });
                }
                var openingTime=[];
                if(current.j1s==0){
                    openingTime.push({dayNumber:0, open:0});
                }
                else{
                    if(current.j1s1de!="" && current.j1s1a!=""){
                        var s1de=myConvert(current.j1s1de);
                        var s1a=myConvert(current.j1s1a);
                        if( !( isNaN(s1de) || isNaN(s1a) ))
                            openingTime.push({dayNumber:0, open:1, openingHour:s1de, closingHour:s1a});
                        if(current.j1s2de!="" && current.j1s2a!=""){
                            var s2de=myConvert(current.j1s2de);
                            var s2a=myConvert(current.j1s2a);
                            if( !( isNaN(s2de) || isNaN(s2a) ))
                                openingTime.push({dayNumber:0, open:1, openingHour:s2de, closingHour:s2a});
                    }
                    }
                    else
                    {
                        openingTime.push({dayNumber:0, open:1, openingHour:null, closingHour:null});
                    }
                }

                if(current.j2s==0){
                    openingTime.push({dayNumber:1, open:0});
                }
                else{
                    if(current.j2s1de!="" && current.j2s1a!=""){
                        var s1de=myConvert(current.j2s1de);
                        var s1a=myConvert(current.j2s1a);
                        if( !( isNaN(s1de) || isNaN(s1a) ))
                            openingTime.push({dayNumber:1, open:1, openingHour:s1de, closingHour:s1a});
                        if(current.j2s2de!="" && current.j2s2a!="" ){
                            var s2de=myConvert(current.j2s2de);
                            var s2a=myConvert(current.j2s2a);
                            if( !( isNaN(s2de) || isNaN(s2a) ))
                                openingTime.push({dayNumber:1, open:1, openingHour:s2de, closingHour:s2a});
                        }
                    }
                    else
                    {
                        openingTime.push({dayNumber:1, open:1, openingHour:null, closingHour:null});
                    }
                }

                if(current.j3s==0){
                    openingTime.push({dayNumber:2, open:0});
                }
                else{
                    if(current.j3s1de!="" && current.j3s1a!="" ){
                        var s1de=myConvert(current.j3s1de);
                        var s1a=myConvert(current.j3s1a);
                        if( !( isNaN(s1de) || isNaN(s1a) ))
                            openingTime.push({dayNumber:2, open:1, openingHour:s1de, closingHour:s1a});
                        if(current.j3s2de!="" && current.j3s2a!="" ){
                            var s2de=myConvert(current.j3s2de);
                            var s2a=myConvert(current.j3s2a);
                            if( !( isNaN(s2de) || isNaN(s2a) ))
                                openingTime.push({dayNumber:2, open:1, openingHour:s2de, closingHour:s2a});
                        }
                    }
                    else
                    {
                        openingTime.push({dayNumber:2, open:1, openingHour:null, closingHour:null});
                    }
                }

                if(current.j4s==0){
                    openingTime.push({dayNumber:3, open:0});
                }
                else{
                    if(current.j4s1de!="" && current.j4s1a!="" ){
                        var s1de=myConvert(current.j4s1de);
                        var s1a=myConvert(current.j4s1a);
                        if( !( isNaN(s1de) || isNaN(s1a) ))
                            openingTime.push({dayNumber:3, open:1, openingHour:s1de, closingHour:s1a});
                        if(current.j4s2de!="" && current.j4s2a!="" ){
                            var s2de=myConvert(current.j4s2de);
                            var s2a=myConvert(current.j4s2a);
                            if( !( isNaN(s2de) || isNaN(s2a) ))
                                openingTime.push({dayNumber:3, open:1, openingHour:s2de, closingHour:s2a});
                        }
                    }
                    else
                    {
                        openingTime.push({dayNumber:3, open:1, openingHour:null, closingHour:null});
                    }
                }

                if(current.j5s==0){
                    openingTime.push({dayNumber:4, open:0});
                }
                else{
                    if(current.j5s1de!="" && current.j5s1a!="" ){
                        var s1de=myConvert(current.j5s1de);
                        var s1a=myConvert(current.j5s1a);
                        if( !( isNaN(s1de) || isNaN(s1a) ))
                            openingTime.push({dayNumber:4, open:1, openingHour:s1de, closingHour:s1a});
                        if(current.j5s2de!="" && current.j5s2a!="" ){
                            var s2de=myConvert(current.j5s2de);
                            var s2a=myConvert(current.j5s2a);
                            if( !( isNaN(s2de) || isNaN(s2a) ))
                                openingTime.push({dayNumber:4, open:1, openingHour:s2de, closingHour:s2a});
                        }
                    }
                    else
                    {
                        openingTime.push({dayNumber:4, open:1, openingHour:null, closingHour:null});
                    }
                }

                if(current.j6s==0){
                    openingTime.push({dayNumber:5, open:0});
                }
                else{
                    if(current.j6s1de!="" && current.j6s1a!="" ){
                        var s1de=myConvert(current.j6s1de);
                        var s1a=myConvert(current.j6s1a);
                        if( !( isNaN(s1de) || isNaN(s1a) ))
                            openingTime.push({dayNumber:5, open:1, openingHour:s1de, closingHour:s1a});
                        if(current.j6s2de!="" && current.j6s2a!="" ){
                            var s2de=myConvert(current.j6s2de);
                            var s2a=myConvert(current.j6s2a);
                            if( !( isNaN(s2de) || isNaN(s2a) ))
                                openingTime.push({dayNumber:5, open:1, openingHour:s2de, closingHour:s2a});
                        }
                    }
                    else
                    {
                        openingTime.push({dayNumber:5, open:1, openingHour:null, closingHour:null});
                    }
                }

                if(current.j7s==0){
                    openingTime.push({dayNumber:6, open:0});
                }
                else{
                    if(current.j7s1de!="" && current.j7s1a!="" ){
                        var s1de=myConvert(current.j7s1de);
                        var s1a=myConvert(current.j7s1a);
                        if( !( isNaN(s1de) || isNaN(s1a) ))
                            openingTime.push({dayNumber:6, open:1, openingHour:s1de, closingHour:s1a});
                        if(current.j7s2de!="" && current.j7s2a!="" ){
                            var s2de=myConvert(current.j7s2de);
                            var s2a=myConvert(current.j7s2a);
                            if( !( isNaN(s2de) || isNaN(s2a) ))
                                openingTime.push({dayNumber:6, open:1, openingHour:s2de, closingHour:s2a});
                        }
                    }
                    else
                    {
                        openingTime.push({dayNumber:6, open:1, openingHour:null, closingHour:null});
                    }
                }


                var gId=0;
                var dId=0;
                var tags=[];
                Gouvernera.find({'name':gouv}, function(err, docs){
                            if(docs.length>0){
                                gId=docs[0].id;
                                if(delegationCode!=0)
                                    delegationFn();
                                else
                                    tagFn();
                            }
                            else{
                                 var g = new Gouvernera({name:gouv});
                                 g.save(function(error){
                                    if (error) console.error('Not able to add gouvernera:', error);
                                    else {
                                        gId=g.id; 
                                        if(delegationCode!=0)
                                            delegationFn();
                                        else
                                            tagFn();
                                    }
                                });
                            }
                        });

                function delegationFn(){
                            Delegation.find({'postCode':delegationCode}, function(err, docs){
                                //console.log(docs);
                                if(docs.length>0){
                                    dId=docs[0].id;
                                    tagFn();
                                }
                                else{
                                    var d = new Delegation({postCode:delegationCode});
                                    d.save(function(error){
                                        if (error) console.error('Not able to add delegation :', error);
                                        else {
                                            dId=d.id;
                                            tagFn();
                                        }
                                    });
                                }
                            });
                        };

                function tagFn(){                        
                    Tag.find({'name':category}, function(err, docs3){
                        if(docs3.length>0){
                            tags.push(docs3[0].id);
                            tag2Fn();
                        }
                        else{
                            var t = new Tag({name:category});
                            t.save(function(error){
                               if (error) console.error('Not able to add Tag :', error); 
                                tags.push(t.id);
                                tag2Fn();
                            });
                        }
                    });
                };

                function tag2Fn(){                        
                    Tag.find({'name':sousCategory}, function(err, docs3){
                        if(docs3.length>0){
                            tags.push(docs3[0].id);
                            businessFn();
                        }
                        else{
                            var t = new Tag({name:sousCategory});
                            t.save(function(error){
                               if (error) console.error('Not able to add Tag 2 :', error); 
                                tags.push(t.id);
                                businessFn();
                            });
                        }
                    });
                };

                function businessFn(){
                    //console.log("gId:"+gId+"   dId  "+dId+" profileImage:"+profileImage);
                    if(dId==0)
                        dId=null;
                    var b = new Business({
                        name:name, 
                        description:description,
                        tel:tel,
                        longitude:longitude,
                        latitude:latitude,
                        adress:adress,
                        gouvernera:gId,
                        delegation:dId,
                        tag:tags,
                        serviceADomicile:serviceADomicile,
                        category:category,
                        sousCategory:sousCategory,
                        email:email,
                        site:site,
                        facebook:facebook,
                        googleplus:googleplus,
                        openingTime:openingTime,
                        profileImage:profileImage,
                        urlScrape:urlScrape

                    });
                    tags=[];
                    openingTime=[];
                    b.save(function(error){
                        if (error) console.error('Not able to add business:', error);
                        else{
                            //console.log("Business Aded");
                        }
                    });



                    i++;
                    if(i<body.length){
                        step();
                    }
                    else
                        go();
                    //   response2.json(body);  

                };

            };
        });
        
        }
        };
    
    
    return;

};
function scrapeBeaute(request2, response2) {
    //max:874
    var debut=0;
    var fin=26;
    
    go();
    
    function go(){
        debut++;
        if(debut>fin){
            response2.json("finish");
            return;
        }
        else
        {
        request.post({
          headers: {'content-type' : 'multipart/form-data; boundary=----WebKitFormBoundaryUo8aX5tAuE19CcSX'},
          url:     'http://www.bonnes-adresses.tn/adresses-sante-a-tunisie.html?enticache=0.44762341329109634&api=pagination',
          body:'------WebKitFormBoundaryUo8aX5tAuE19CcSX\nContent-Disposition: form-data; name="jsonDataApiTransfert\n\n{"page":'+debut+',"filter":{"categorie":"4","ville":"Tunisie"}}\n------WebKitFormBoundaryUo8aX5tAuE19CcSX--'
        }, function(error, response, body)
         {
            body=JSON.parse(body);
            body=body.master_data.data;
            var i=0;
            step();
            function step(){
                var current=body[i];

                var name=current.titre;
                var adress=current.adresse;
                var description=current.description;
                var tel=current.tel;
                var email=current.email;
                var site=current.site;
                var facebook=current.facebook;
                var googleplus=current.googleplus;
               if (current.marker && current.marker[0] )
                { 
                    var longitude=current.marker[0];
                    if(longitude!=0)
                        var latitude=current.marker[1];
                    else
                        var latitude=0;
                }

                var sousCategory=current.categorie;
                var category='Beauté et bien être';

                if(current.service_a_domicile==0)
                    var serviceADomicile=false;
                else
                    var serviceADomicile=true;
                var gouv=current.ville;
                var urlScrape=current.url;
                var delegationCode=current.cp;
                var profileImage=current.photo;
                if(profileImage.indexOf('no_photo')!=-1 || profileImage.indexOf('gravatar')!=-1){
                    profileImage='default.png';
                }
                else{
                    var uri = Math.round(+new Date()/1000);  
                    profileImage=uri+'.jpg';
                    request(current.photo, {encoding: 'binary'}, function(error, response, bodyImg) {
                      fs.writeFile('public/img/bimg/'+profileImage, bodyImg, 'binary', function (err) {});
                    });
                }
                var openingTime=[];
                if(current.j1s==0){
                    openingTime.push({dayNumber:0, open:0});
                }
                else{
                    if(current.j1s1de!="" && current.j1s1a!=""){
                        var s1de=myConvert(current.j1s1de);
                        var s1a=myConvert(current.j1s1a);
                        if( !( isNaN(s1de) || isNaN(s1a) ))
                            openingTime.push({dayNumber:0, open:1, openingHour:s1de, closingHour:s1a});
                        if(current.j1s2de!="" && current.j1s2a!=""){
                            var s2de=myConvert(current.j1s2de);
                            var s2a=myConvert(current.j1s2a);
                            if( !( isNaN(s2de) || isNaN(s2a) ))
                                openingTime.push({dayNumber:0, open:1, openingHour:s2de, closingHour:s2a});
                    }
                    }
                    else
                    {
                        openingTime.push({dayNumber:0, open:1, openingHour:null, closingHour:null});
                    }
                }

                if(current.j2s==0){
                    openingTime.push({dayNumber:1, open:0});
                }
                else{
                    if(current.j2s1de!="" && current.j2s1a!=""){
                        var s1de=myConvert(current.j2s1de);
                        var s1a=myConvert(current.j2s1a);
                        if( !( isNaN(s1de) || isNaN(s1a) ))
                            openingTime.push({dayNumber:1, open:1, openingHour:s1de, closingHour:s1a});
                        if(current.j2s2de!="" && current.j2s2a!="" ){
                            var s2de=myConvert(current.j2s2de);
                            var s2a=myConvert(current.j2s2a);
                            if( !( isNaN(s2de) || isNaN(s2a) ))
                                openingTime.push({dayNumber:1, open:1, openingHour:s2de, closingHour:s2a});
                        }
                    }
                    else
                    {
                        openingTime.push({dayNumber:1, open:1, openingHour:null, closingHour:null});
                    }
                }

                if(current.j3s==0){
                    openingTime.push({dayNumber:2, open:0});
                }
                else{
                    if(current.j3s1de!="" && current.j3s1a!="" ){
                        var s1de=myConvert(current.j3s1de);
                        var s1a=myConvert(current.j3s1a);
                        if( !( isNaN(s1de) || isNaN(s1a) ))
                            openingTime.push({dayNumber:2, open:1, openingHour:s1de, closingHour:s1a});
                        if(current.j3s2de!="" && current.j3s2a!="" ){
                            var s2de=myConvert(current.j3s2de);
                            var s2a=myConvert(current.j3s2a);
                            if( !( isNaN(s2de) || isNaN(s2a) ))
                                openingTime.push({dayNumber:2, open:1, openingHour:s2de, closingHour:s2a});
                        }
                    }
                    else
                    {
                        openingTime.push({dayNumber:2, open:1, openingHour:null, closingHour:null});
                    }
                }

                if(current.j4s==0){
                    openingTime.push({dayNumber:3, open:0});
                }
                else{
                    if(current.j4s1de!="" && current.j4s1a!="" ){
                        var s1de=myConvert(current.j4s1de);
                        var s1a=myConvert(current.j4s1a);
                        if( !( isNaN(s1de) || isNaN(s1a) ))
                            openingTime.push({dayNumber:3, open:1, openingHour:s1de, closingHour:s1a});
                        if(current.j4s2de!="" && current.j4s2a!="" ){
                            var s2de=myConvert(current.j4s2de);
                            var s2a=myConvert(current.j4s2a);
                            if( !( isNaN(s2de) || isNaN(s2a) ))
                                openingTime.push({dayNumber:3, open:1, openingHour:s2de, closingHour:s2a});
                        }
                    }
                    else
                    {
                        openingTime.push({dayNumber:3, open:1, openingHour:null, closingHour:null});
                    }
                }

                if(current.j5s==0){
                    openingTime.push({dayNumber:4, open:0});
                }
                else{
                    if(current.j5s1de!="" && current.j5s1a!="" ){
                        var s1de=myConvert(current.j5s1de);
                        var s1a=myConvert(current.j5s1a);
                        if( !( isNaN(s1de) || isNaN(s1a) ))
                            openingTime.push({dayNumber:4, open:1, openingHour:s1de, closingHour:s1a});
                        if(current.j5s2de!="" && current.j5s2a!="" ){
                            var s2de=myConvert(current.j5s2de);
                            var s2a=myConvert(current.j5s2a);
                            if( !( isNaN(s2de) || isNaN(s2a) ))
                                openingTime.push({dayNumber:4, open:1, openingHour:s2de, closingHour:s2a});
                        }
                    }
                    else
                    {
                        openingTime.push({dayNumber:4, open:1, openingHour:null, closingHour:null});
                    }
                }

                if(current.j6s==0){
                    openingTime.push({dayNumber:5, open:0});
                }
                else{
                    if(current.j6s1de!="" && current.j6s1a!="" ){
                        var s1de=myConvert(current.j6s1de);
                        var s1a=myConvert(current.j6s1a);
                        if( !( isNaN(s1de) || isNaN(s1a) ))
                            openingTime.push({dayNumber:5, open:1, openingHour:s1de, closingHour:s1a});
                        if(current.j6s2de!="" && current.j6s2a!="" ){
                            var s2de=myConvert(current.j6s2de);
                            var s2a=myConvert(current.j6s2a);
                            if( !( isNaN(s2de) || isNaN(s2a) ))
                                openingTime.push({dayNumber:5, open:1, openingHour:s2de, closingHour:s2a});
                        }
                    }
                    else
                    {
                        openingTime.push({dayNumber:5, open:1, openingHour:null, closingHour:null});
                    }
                }

                if(current.j7s==0){
                    openingTime.push({dayNumber:6, open:0});
                }
                else{
                    if(current.j7s1de!="" && current.j7s1a!="" ){
                        var s1de=myConvert(current.j7s1de);
                        var s1a=myConvert(current.j7s1a);
                        if( !( isNaN(s1de) || isNaN(s1a) ))
                            openingTime.push({dayNumber:6, open:1, openingHour:s1de, closingHour:s1a});
                        if(current.j7s2de!="" && current.j7s2a!="" ){
                            var s2de=myConvert(current.j7s2de);
                            var s2a=myConvert(current.j7s2a);
                            if( !( isNaN(s2de) || isNaN(s2a) ))
                                openingTime.push({dayNumber:6, open:1, openingHour:s2de, closingHour:s2a});
                        }
                    }
                    else
                    {
                        openingTime.push({dayNumber:6, open:1, openingHour:null, closingHour:null});
                    }
                }


                var gId=0;
                var dId=0;
                var tags=[];
                Gouvernera.find({'name':gouv}, function(err, docs){
                            if(docs.length>0){
                                gId=docs[0].id;
                                if(delegationCode!=0)
                                    delegationFn();
                                else
                                    tagFn();
                            }
                            else{
                                 var g = new Gouvernera({name:gouv});
                                 g.save(function(error){
                                    if (error) console.error('Not able to add gouvernera:', error);
                                    else {
                                        gId=g.id; 
                                        if(delegationCode!=0)
                                            delegationFn();
                                        else
                                            tagFn();
                                    }
                                });
                            }
                        });

                function delegationFn(){
                            Delegation.find({'postCode':delegationCode}, function(err, docs){
                                //console.log(docs);
                                if(docs.length>0){
                                    dId=docs[0].id;
                                    tagFn();
                                }
                                else{
                                    var d = new Delegation({postCode:delegationCode});
                                    d.save(function(error){
                                        if (error) console.error('Not able to add delegation :', error);
                                        else {
                                            dId=d.id;
                                            tagFn();
                                        }
                                    });
                                }
                            });
                        };

                function tagFn(){                        
                    Tag.find({'name':category}, function(err, docs3){
                        if(docs3.length>0){
                            tags.push(docs3[0].id);
                            tag2Fn();
                        }
                        else{
                            var t = new Tag({name:category});
                            t.save(function(error){
                               if (error) console.error('Not able to add Tag :', error); 
                                tags.push(t.id);
                                tag2Fn();
                            });
                        }
                    });
                };

                function tag2Fn(){                        
                    Tag.find({'name':sousCategory}, function(err, docs3){
                        if(docs3.length>0){
                            tags.push(docs3[0].id);
                            businessFn();
                        }
                        else{
                            var t = new Tag({name:sousCategory});
                            t.save(function(error){
                               if (error) console.error('Not able to add Tag 2 :', error); 
                                tags.push(t.id);
                                businessFn();
                            });
                        }
                    });
                };

                function businessFn(){
                    //console.log("gId:"+gId+"   dId  "+dId+" profileImage:"+profileImage);
                    if(dId==0)
                        dId=null;
                    var b = new Business({
                        name:name, 
                        description:description,
                        tel:tel,
                        longitude:longitude,
                        latitude:latitude,
                        adress:adress,
                        gouvernera:gId,
                        delegation:dId,
                        tag:tags,
                        serviceADomicile:serviceADomicile,
                        category:category,
                        sousCategory:sousCategory,
                        email:email,
                        site:site,
                        facebook:facebook,
                        googleplus:googleplus,
                        openingTime:openingTime,
                        profileImage:profileImage,
                        urlScrape:urlScrape

                    });
                    tags=[];
                    openingTime=[];
                    b.save(function(error){
                        if (error) console.error('Not able to add business:', error);
                        else{
                            //console.log("Business Aded");
                        }
                    });



                    i++;
                    if(i<body.length){
                        step();
                    }
                    else
                        go();
                    //   response2.json(body);  

                };

            };
        });
        
        }
        };
    
    
    return;

};
function scrapeVoyageLoisirs(request2, response2) {
    //max:874
    var debut=1;
    var fin=186;
    
    go();
    
    function go(){
        debut++;
        if(debut>fin){
            response2.json("finish");
            return;
        }
        else
        {
        request.post({
          headers: {'content-type' : 'multipart/form-data; boundary=----WebKitFormBoundaryUo8aX5tAuE19CcSX'},
          url:     'http://www.bonnes-adresses.tn/adresses-sante-a-tunisie.html?enticache=0.44762341329109634&api=pagination',
          body:'------WebKitFormBoundaryUo8aX5tAuE19CcSX\nContent-Disposition: form-data; name="jsonDataApiTransfert\n\n{"page":'+debut+',"filter":{"categorie":"5","ville":"Tunisie"}}\n------WebKitFormBoundaryUo8aX5tAuE19CcSX--'
        }, function(error, response, body)
         {
            body=JSON.parse(body);
            body=body.master_data.data;
            var i=0;
            step();
            function step(){
                var current=body[i];

                var name=current.titre;
                var adress=current.adresse;
                var description=current.description;
                var tel=current.tel;
                var email=current.email;
                var site=current.site;
                var facebook=current.facebook;
                var googleplus=current.googleplus;
                var longitude=current.marker[0];
                if(longitude!=0)
                    var latitude=current.marker[1];
                else
                    var latitude=0;

                var sousCategory=current.categorie;
                var category='voyages et loisirs';

                if(current.service_a_domicile==0)
                    var serviceADomicile=false;
                else
                    var serviceADomicile=true;
                var gouv=current.ville;
                var urlScrape=current.url;
                var delegationCode=current.cp;
                var profileImage=current.photo;
                if(profileImage.indexOf('no_photo')!=-1 || profileImage.indexOf('gravatar')!=-1){
                    profileImage='default.png';
                }
                else{
                    var uri = Math.round(+new Date()/1000);  
                    profileImage=uri+'.jpg';
                    request(current.photo, {encoding: 'binary'}, function(error, response, bodyImg) {
                      fs.writeFile('public/img/bimg/'+profileImage, bodyImg, 'binary', function (err) {});
                    });
                }
                var openingTime=[];
                if(current.j1s==0){
                    openingTime.push({dayNumber:0, open:0});
                }
                else{
                    if(current.j1s1de!="" && current.j1s1a!=""){
                        var s1de=myConvert(current.j1s1de);
                        var s1a=myConvert(current.j1s1a);
                        if( !( isNaN(s1de) || isNaN(s1a) ))
                            openingTime.push({dayNumber:0, open:1, openingHour:s1de, closingHour:s1a});
                        if(current.j1s2de!="" && current.j1s2a!=""){
                            var s2de=myConvert(current.j1s2de);
                            var s2a=myConvert(current.j1s2a);
                            if( !( isNaN(s2de) || isNaN(s2a) ))
                                openingTime.push({dayNumber:0, open:1, openingHour:s2de, closingHour:s2a});
                    }
                    }
                    else
                    {
                        openingTime.push({dayNumber:0, open:1, openingHour:null, closingHour:null});
                    }
                }

                if(current.j2s==0){
                    openingTime.push({dayNumber:1, open:0});
                }
                else{
                    if(current.j2s1de!="" && current.j2s1a!=""){
                        var s1de=myConvert(current.j2s1de);
                        var s1a=myConvert(current.j2s1a);
                        if( !( isNaN(s1de) || isNaN(s1a) ))
                            openingTime.push({dayNumber:1, open:1, openingHour:s1de, closingHour:s1a});
                        if(current.j2s2de!="" && current.j2s2a!="" ){
                            var s2de=myConvert(current.j2s2de);
                            var s2a=myConvert(current.j2s2a);
                            if( !( isNaN(s2de) || isNaN(s2a) ))
                                openingTime.push({dayNumber:1, open:1, openingHour:s2de, closingHour:s2a});
                        }
                    }
                    else
                    {
                        openingTime.push({dayNumber:1, open:1, openingHour:null, closingHour:null});
                    }
                }

                if(current.j3s==0){
                    openingTime.push({dayNumber:2, open:0});
                }
                else{
                    if(current.j3s1de!="" && current.j3s1a!="" ){
                        var s1de=myConvert(current.j3s1de);
                        var s1a=myConvert(current.j3s1a);
                        if( !( isNaN(s1de) || isNaN(s1a) ))
                            openingTime.push({dayNumber:2, open:1, openingHour:s1de, closingHour:s1a});
                        if(current.j3s2de!="" && current.j3s2a!="" ){
                            var s2de=myConvert(current.j3s2de);
                            var s2a=myConvert(current.j3s2a);
                            if( !( isNaN(s2de) || isNaN(s2a) ))
                                openingTime.push({dayNumber:2, open:1, openingHour:s2de, closingHour:s2a});
                        }
                    }
                    else
                    {
                        openingTime.push({dayNumber:2, open:1, openingHour:null, closingHour:null});
                    }
                }

                if(current.j4s==0){
                    openingTime.push({dayNumber:3, open:0});
                }
                else{
                    if(current.j4s1de!="" && current.j4s1a!="" ){
                        var s1de=myConvert(current.j4s1de);
                        var s1a=myConvert(current.j4s1a);
                        if( !( isNaN(s1de) || isNaN(s1a) ))
                            openingTime.push({dayNumber:3, open:1, openingHour:s1de, closingHour:s1a});
                        if(current.j4s2de!="" && current.j4s2a!="" ){
                            var s2de=myConvert(current.j4s2de);
                            var s2a=myConvert(current.j4s2a);
                            if( !( isNaN(s2de) || isNaN(s2a) ))
                                openingTime.push({dayNumber:3, open:1, openingHour:s2de, closingHour:s2a});
                        }
                    }
                    else
                    {
                        openingTime.push({dayNumber:3, open:1, openingHour:null, closingHour:null});
                    }
                }

                if(current.j5s==0){
                    openingTime.push({dayNumber:4, open:0});
                }
                else{
                    if(current.j5s1de!="" && current.j5s1a!="" ){
                        var s1de=myConvert(current.j5s1de);
                        var s1a=myConvert(current.j5s1a);
                        if( !( isNaN(s1de) || isNaN(s1a) ))
                            openingTime.push({dayNumber:4, open:1, openingHour:s1de, closingHour:s1a});
                        if(current.j5s2de!="" && current.j5s2a!="" ){
                            var s2de=myConvert(current.j5s2de);
                            var s2a=myConvert(current.j5s2a);
                            if( !( isNaN(s2de) || isNaN(s2a) ))
                                openingTime.push({dayNumber:4, open:1, openingHour:s2de, closingHour:s2a});
                        }
                    }
                    else
                    {
                        openingTime.push({dayNumber:4, open:1, openingHour:null, closingHour:null});
                    }
                }

                if(current.j6s==0){
                    openingTime.push({dayNumber:5, open:0});
                }
                else{
                    if(current.j6s1de!="" && current.j6s1a!="" ){
                        var s1de=myConvert(current.j6s1de);
                        var s1a=myConvert(current.j6s1a);
                        if( !( isNaN(s1de) || isNaN(s1a) ))
                            openingTime.push({dayNumber:5, open:1, openingHour:s1de, closingHour:s1a});
                        if(current.j6s2de!="" && current.j6s2a!="" ){
                            var s2de=myConvert(current.j6s2de);
                            var s2a=myConvert(current.j6s2a);
                            if( !( isNaN(s2de) || isNaN(s2a) ))
                                openingTime.push({dayNumber:5, open:1, openingHour:s2de, closingHour:s2a});
                        }
                    }
                    else
                    {
                        openingTime.push({dayNumber:5, open:1, openingHour:null, closingHour:null});
                    }
                }

                if(current.j7s==0){
                    openingTime.push({dayNumber:6, open:0});
                }
                else{
                    if(current.j7s1de!="" && current.j7s1a!="" ){
                        var s1de=myConvert(current.j7s1de);
                        var s1a=myConvert(current.j7s1a);
                        if( !( isNaN(s1de) || isNaN(s1a) ))
                            openingTime.push({dayNumber:6, open:1, openingHour:s1de, closingHour:s1a});
                        if(current.j7s2de!="" && current.j7s2a!="" ){
                            var s2de=myConvert(current.j7s2de);
                            var s2a=myConvert(current.j7s2a);
                            if( !( isNaN(s2de) || isNaN(s2a) ))
                                openingTime.push({dayNumber:6, open:1, openingHour:s2de, closingHour:s2a});
                        }
                    }
                    else
                    {
                        openingTime.push({dayNumber:6, open:1, openingHour:null, closingHour:null});
                    }
                }


                var gId=0;
                var dId=0;
                var tags=[];
                Gouvernera.find({'name':gouv}, function(err, docs){
                            if(docs.length>0){
                                gId=docs[0].id;
                                if(delegationCode!=0)
                                    delegationFn();
                                else
                                    tagFn();
                            }
                            else{
                                 var g = new Gouvernera({name:gouv});
                                 g.save(function(error){
                                    if (error) console.error('Not able to add gouvernera:', error);
                                    else {
                                        gId=g.id; 
                                        if(delegationCode!=0)
                                            delegationFn();
                                        else
                                            tagFn();
                                    }
                                });
                            }
                        });

                function delegationFn(){
                            Delegation.find({'postCode':delegationCode}, function(err, docs){
                                //console.log(docs);
                                if(docs.length>0){
                                    dId=docs[0].id;
                                    tagFn();
                                }
                                else{
                                    var d = new Delegation({postCode:delegationCode});
                                    d.save(function(error){
                                        if (error) console.error('Not able to add delegation :', error);
                                        else {
                                            dId=d.id;
                                            tagFn();
                                        }
                                    });
                                }
                            });
                        };

                function tagFn(){                        
                    Tag.find({'name':category}, function(err, docs3){
                        if(docs3.length>0){
                            tags.push(docs3[0].id);
                            tag2Fn();
                        }
                        else{
                            var t = new Tag({name:category});
                            t.save(function(error){
                               if (error) console.error('Not able to add Tag :', error); 
                                tags.push(t.id);
                                tag2Fn();
                            });
                        }
                    });
                };

                function tag2Fn(){                        
                    Tag.find({'name':sousCategory}, function(err, docs3){
                        if(docs3.length>0){
                            tags.push(docs3[0].id);
                            businessFn();
                        }
                        else{
                            var t = new Tag({name:sousCategory});
                            t.save(function(error){
                               if (error) console.error('Not able to add Tag 2 :', error); 
                                tags.push(t.id);
                                businessFn();
                            });
                        }
                    });
                };

                function businessFn(){
                    //console.log("gId:"+gId+"   dId  "+dId+" profileImage:"+profileImage);
                    if(dId==0)
                        dId=null;
                    var b = new Business({
                        name:name, 
                        description:description,
                        tel:tel,
                        longitude:longitude,
                        latitude:latitude,
                        adress:adress,
                        gouvernera:gId,
                        delegation:dId,
                        tag:tags,
                        serviceADomicile:serviceADomicile,
                        category:category,
                        sousCategory:sousCategory,
                        email:email,
                        site:site,
                        facebook:facebook,
                        googleplus:googleplus,
                        openingTime:openingTime,
                        profileImage:profileImage,
                        urlScrape:urlScrape

                    });
                    tags=[];
                    openingTime=[];
                    b.save(function(error){
                        if (error) console.error('Not able to add business:', error);
                        else{
                            //console.log("Business Aded");
                        }
                    });



                    i++;
                    if(i<body.length){
                        step();
                    }
                    else
                        go();
                    //   response2.json(body);  

                };

            };
        });
        
        }
        };
    
    
    return;

};
function scrapeHighTech(request2, response2) {
    //max:874
    var debut=1;
    var fin=186;
    
    go();
    
    function go(){
        debut++;
        if(debut>fin){
            response2.json("finish");
            return;
        }
        else
        {
        request.post({
          headers: {'content-type' : 'multipart/form-data; boundary=----WebKitFormBoundaryUo8aX5tAuE19CcSX'},
          url:     'http://www.bonnes-adresses.tn/adresses-sante-a-tunisie.html?enticache=0.44762341329109634&api=pagination',
          body:'------WebKitFormBoundaryUo8aX5tAuE19CcSX\nContent-Disposition: form-data; name="jsonDataApiTransfert\n\n{"page":'+debut+',"filter":{"categorie":"6","ville":"Tunisie"}}\n------WebKitFormBoundaryUo8aX5tAuE19CcSX--'
        }, function(error, response, body)
         {
            body=JSON.parse(body);
            body=body.master_data.data;
            var i=0;
            step();
            function step(){
                var current=body[i];

                var name=current.titre;
                var adress=current.adresse;
                var description=current.description;
                var tel=current.tel;
                var email=current.email;
                var site=current.site;
                var facebook=current.facebook;
                var googleplus=current.googleplus;
                var longitude=current.marker[0];
                if(longitude!=0)
                    var latitude=current.marker[1];
                else
                    var latitude=0;

                var sousCategory=current.categorie;
                var category='High Tech';

                if(current.service_a_domicile==0)
                    var serviceADomicile=false;
                else
                    var serviceADomicile=true;
                var gouv=current.ville;
                var urlScrape=current.url;
                var delegationCode=current.cp;
                var profileImage=current.photo;
                if(profileImage.indexOf('no_photo')!=-1 || profileImage.indexOf('gravatar')!=-1){
                    profileImage='default.png';
                }
                else{
                    var uri = Math.round(+new Date()/1000);  
                    profileImage=uri+'.jpg';
                    request(current.photo, {encoding: 'binary'}, function(error, response, bodyImg) {
                      fs.writeFile('public/img/bimg/'+profileImage, bodyImg, 'binary', function (err) {});
                    });
                }
                var openingTime=[];
                if(current.j1s==0){
                    openingTime.push({dayNumber:0, open:0});
                }
                else{
                    if(current.j1s1de!="" && current.j1s1a!=""){
                        var s1de=myConvert(current.j1s1de);
                        var s1a=myConvert(current.j1s1a);
                        if( !( isNaN(s1de) || isNaN(s1a) ))
                            openingTime.push({dayNumber:0, open:1, openingHour:s1de, closingHour:s1a});
                        if(current.j1s2de!="" && current.j1s2a!=""){
                            var s2de=myConvert(current.j1s2de);
                            var s2a=myConvert(current.j1s2a);
                            if( !( isNaN(s2de) || isNaN(s2a) ))
                                openingTime.push({dayNumber:0, open:1, openingHour:s2de, closingHour:s2a});
                    }
                    }
                    else
                    {
                        openingTime.push({dayNumber:0, open:1, openingHour:null, closingHour:null});
                    }
                }

                if(current.j2s==0){
                    openingTime.push({dayNumber:1, open:0});
                }
                else{
                    if(current.j2s1de!="" && current.j2s1a!=""){
                        var s1de=myConvert(current.j2s1de);
                        var s1a=myConvert(current.j2s1a);
                        if( !( isNaN(s1de) || isNaN(s1a) ))
                            openingTime.push({dayNumber:1, open:1, openingHour:s1de, closingHour:s1a});
                        if(current.j2s2de!="" && current.j2s2a!="" ){
                            var s2de=myConvert(current.j2s2de);
                            var s2a=myConvert(current.j2s2a);
                            if( !( isNaN(s2de) || isNaN(s2a) ))
                                openingTime.push({dayNumber:1, open:1, openingHour:s2de, closingHour:s2a});
                        }
                    }
                    else
                    {
                        openingTime.push({dayNumber:1, open:1, openingHour:null, closingHour:null});
                    }
                }

                if(current.j3s==0){
                    openingTime.push({dayNumber:2, open:0});
                }
                else{
                    if(current.j3s1de!="" && current.j3s1a!="" ){
                        var s1de=myConvert(current.j3s1de);
                        var s1a=myConvert(current.j3s1a);
                        if( !( isNaN(s1de) || isNaN(s1a) ))
                            openingTime.push({dayNumber:2, open:1, openingHour:s1de, closingHour:s1a});
                        if(current.j3s2de!="" && current.j3s2a!="" ){
                            var s2de=myConvert(current.j3s2de);
                            var s2a=myConvert(current.j3s2a);
                            if( !( isNaN(s2de) || isNaN(s2a) ))
                                openingTime.push({dayNumber:2, open:1, openingHour:s2de, closingHour:s2a});
                        }
                    }
                    else
                    {
                        openingTime.push({dayNumber:2, open:1, openingHour:null, closingHour:null});
                    }
                }

                if(current.j4s==0){
                    openingTime.push({dayNumber:3, open:0});
                }
                else{
                    if(current.j4s1de!="" && current.j4s1a!="" ){
                        var s1de=myConvert(current.j4s1de);
                        var s1a=myConvert(current.j4s1a);
                        if( !( isNaN(s1de) || isNaN(s1a) ))
                            openingTime.push({dayNumber:3, open:1, openingHour:s1de, closingHour:s1a});
                        if(current.j4s2de!="" && current.j4s2a!="" ){
                            var s2de=myConvert(current.j4s2de);
                            var s2a=myConvert(current.j4s2a);
                            if( !( isNaN(s2de) || isNaN(s2a) ))
                                openingTime.push({dayNumber:3, open:1, openingHour:s2de, closingHour:s2a});
                        }
                    }
                    else
                    {
                        openingTime.push({dayNumber:3, open:1, openingHour:null, closingHour:null});
                    }
                }

                if(current.j5s==0){
                    openingTime.push({dayNumber:4, open:0});
                }
                else{
                    if(current.j5s1de!="" && current.j5s1a!="" ){
                        var s1de=myConvert(current.j5s1de);
                        var s1a=myConvert(current.j5s1a);
                        if( !( isNaN(s1de) || isNaN(s1a) ))
                            openingTime.push({dayNumber:4, open:1, openingHour:s1de, closingHour:s1a});
                        if(current.j5s2de!="" && current.j5s2a!="" ){
                            var s2de=myConvert(current.j5s2de);
                            var s2a=myConvert(current.j5s2a);
                            if( !( isNaN(s2de) || isNaN(s2a) ))
                                openingTime.push({dayNumber:4, open:1, openingHour:s2de, closingHour:s2a});
                        }
                    }
                    else
                    {
                        openingTime.push({dayNumber:4, open:1, openingHour:null, closingHour:null});
                    }
                }

                if(current.j6s==0){
                    openingTime.push({dayNumber:5, open:0});
                }
                else{
                    if(current.j6s1de!="" && current.j6s1a!="" ){
                        var s1de=myConvert(current.j6s1de);
                        var s1a=myConvert(current.j6s1a);
                        if( !( isNaN(s1de) || isNaN(s1a) ))
                            openingTime.push({dayNumber:5, open:1, openingHour:s1de, closingHour:s1a});
                        if(current.j6s2de!="" && current.j6s2a!="" ){
                            var s2de=myConvert(current.j6s2de);
                            var s2a=myConvert(current.j6s2a);
                            if( !( isNaN(s2de) || isNaN(s2a) ))
                                openingTime.push({dayNumber:5, open:1, openingHour:s2de, closingHour:s2a});
                        }
                    }
                    else
                    {
                        openingTime.push({dayNumber:5, open:1, openingHour:null, closingHour:null});
                    }
                }

                if(current.j7s==0){
                    openingTime.push({dayNumber:6, open:0});
                }
                else{
                    if(current.j7s1de!="" && current.j7s1a!="" ){
                        var s1de=myConvert(current.j7s1de);
                        var s1a=myConvert(current.j7s1a);
                        if( !( isNaN(s1de) || isNaN(s1a) ))
                            openingTime.push({dayNumber:6, open:1, openingHour:s1de, closingHour:s1a});
                        if(current.j7s2de!="" && current.j7s2a!="" ){
                            var s2de=myConvert(current.j7s2de);
                            var s2a=myConvert(current.j7s2a);
                            if( !( isNaN(s2de) || isNaN(s2a) ))
                                openingTime.push({dayNumber:6, open:1, openingHour:s2de, closingHour:s2a});
                        }
                    }
                    else
                    {
                        openingTime.push({dayNumber:6, open:1, openingHour:null, closingHour:null});
                    }
                }


                var gId=0;
                var dId=0;
                var tags=[];
                Gouvernera.find({'name':gouv}, function(err, docs){
                            if(docs.length>0){
                                gId=docs[0].id;
                                if(delegationCode!=0)
                                    delegationFn();
                                else
                                    tagFn();
                            }
                            else{
                                 var g = new Gouvernera({name:gouv});
                                 g.save(function(error){
                                    if (error) console.error('Not able to add gouvernera:', error);
                                    else {
                                        gId=g.id; 
                                        if(delegationCode!=0)
                                            delegationFn();
                                        else
                                            tagFn();
                                    }
                                });
                            }
                        });

                function delegationFn(){
                            Delegation.find({'postCode':delegationCode}, function(err, docs){
                                //console.log(docs);
                                if(docs.length>0){
                                    dId=docs[0].id;
                                    tagFn();
                                }
                                else{
                                    var d = new Delegation({postCode:delegationCode});
                                    d.save(function(error){
                                        if (error) console.error('Not able to add delegation :', error);
                                        else {
                                            dId=d.id;
                                            tagFn();
                                        }
                                    });
                                }
                            });
                        };

                function tagFn(){                        
                    Tag.find({'name':category}, function(err, docs3){
                        if(docs3.length>0){
                            tags.push(docs3[0].id);
                            tag2Fn();
                        }
                        else{
                            var t = new Tag({name:category});
                            t.save(function(error){
                               if (error) console.error('Not able to add Tag :', error); 
                                tags.push(t.id);
                                tag2Fn();
                            });
                        }
                    });
                };

                function tag2Fn(){                        
                    Tag.find({'name':sousCategory}, function(err, docs3){
                        if(docs3.length>0){
                            tags.push(docs3[0].id);
                            businessFn();
                        }
                        else{
                            var t = new Tag({name:sousCategory});
                            t.save(function(error){
                               if (error) console.error('Not able to add Tag 2 :', error); 
                                tags.push(t.id);
                                businessFn();
                            });
                        }
                    });
                };

                function businessFn(){
                    //console.log("gId:"+gId+"   dId  "+dId+" profileImage:"+profileImage);
                    if(dId==0)
                        dId=null;
                    var b = new Business({
                        name:name, 
                        description:description,
                        tel:tel,
                        longitude:longitude,
                        latitude:latitude,
                        adress:adress,
                        gouvernera:gId,
                        delegation:dId,
                        tag:tags,
                        serviceADomicile:serviceADomicile,
                        category:category,
                        sousCategory:sousCategory,
                        email:email,
                        site:site,
                        facebook:facebook,
                        googleplus:googleplus,
                        openingTime:openingTime,
                        profileImage:profileImage,
                        urlScrape:urlScrape

                    });
                    tags=[];
                    openingTime=[];
                    b.save(function(error){
                        if (error) console.error('Not able to add business:', error);
                        else{
                            //console.log("Business Aded");
                        }
                    });



                    i++;
                    if(i<body.length){
                        step();
                    }
                    else
                        go();
                    //   response2.json(body);  

                };

            };
        });
        
        }
        };
    
    
    return;

};
function scrapeEnfantEducation(request2, response2) {
    //max:874
    var debut=1;
    var fin=72;
    
    go();
    
    function go(){
        debut++;
        if(debut>fin){
            response2.json("finish");
            return;
        }
        else
        {
        request.post({
          headers: {'content-type' : 'multipart/form-data; boundary=----WebKitFormBoundaryUo8aX5tAuE19CcSX'},
          url:     'http://www.bonnes-adresses.tn/adresses-sante-a-tunisie.html?enticache=0.44762341329109634&api=pagination',
          body:'------WebKitFormBoundaryUo8aX5tAuE19CcSX\nContent-Disposition: form-data; name="jsonDataApiTransfert\n\n{"page":'+debut+',"filter":{"categorie":"7","ville":"Tunisie"}}\n------WebKitFormBoundaryUo8aX5tAuE19CcSX--'
        }, function(error, response, body)
         {
            body=JSON.parse(body);
            body=body.master_data.data;
            var i=0;
            step();
            function step(){
                var current=body[i];

                var name=current.titre;
                var adress=current.adresse;
                var description=current.description;
                var tel=current.tel;
                var email=current.email;
                var site=current.site;
                var facebook=current.facebook;
                var googleplus=current.googleplus;
                var longitude=current.marker[0];
                if(longitude!=0)
                    var latitude=current.marker[1];
                else
                    var latitude=0;

                var sousCategory=current.categorie;
                var category='Enfant et Education';

                if(current.service_a_domicile==0)
                    var serviceADomicile=false;
                else
                    var serviceADomicile=true;
                var gouv=current.ville;
                var urlScrape=current.url;
                var delegationCode=current.cp;
                var profileImage=current.photo;
                if(profileImage.indexOf('no_photo')!=-1 || profileImage.indexOf('gravatar')!=-1){
                    profileImage='default.png';
                }
                else{
                    var uri = Math.round(+new Date()/1000);  
                    profileImage=uri+'.jpg';
                    request(current.photo, {encoding: 'binary'}, function(error, response, bodyImg) {
                      fs.writeFile('public/img/bimg/'+profileImage, bodyImg, 'binary', function (err) {});
                    });
                }
                var openingTime=[];
                if(current.j1s==0){
                    openingTime.push({dayNumber:0, open:0});
                }
                else{
                    if(current.j1s1de!="" && current.j1s1a!=""){
                        var s1de=myConvert(current.j1s1de);
                        var s1a=myConvert(current.j1s1a);
                        if( !( isNaN(s1de) || isNaN(s1a) ))
                            openingTime.push({dayNumber:0, open:1, openingHour:s1de, closingHour:s1a});
                        if(current.j1s2de!="" && current.j1s2a!=""){
                            var s2de=myConvert(current.j1s2de);
                            var s2a=myConvert(current.j1s2a);
                            if( !( isNaN(s2de) || isNaN(s2a) ))
                                openingTime.push({dayNumber:0, open:1, openingHour:s2de, closingHour:s2a});
                    }
                    }
                    else
                    {
                        openingTime.push({dayNumber:0, open:1, openingHour:null, closingHour:null});
                    }
                }

                if(current.j2s==0){
                    openingTime.push({dayNumber:1, open:0});
                }
                else{
                    if(current.j2s1de!="" && current.j2s1a!=""){
                        var s1de=myConvert(current.j2s1de);
                        var s1a=myConvert(current.j2s1a);
                        if( !( isNaN(s1de) || isNaN(s1a) ))
                            openingTime.push({dayNumber:1, open:1, openingHour:s1de, closingHour:s1a});
                        if(current.j2s2de!="" && current.j2s2a!="" ){
                            var s2de=myConvert(current.j2s2de);
                            var s2a=myConvert(current.j2s2a);
                            if( !( isNaN(s2de) || isNaN(s2a) ))
                                openingTime.push({dayNumber:1, open:1, openingHour:s2de, closingHour:s2a});
                        }
                    }
                    else
                    {
                        openingTime.push({dayNumber:1, open:1, openingHour:null, closingHour:null});
                    }
                }

                if(current.j3s==0){
                    openingTime.push({dayNumber:2, open:0});
                }
                else{
                    if(current.j3s1de!="" && current.j3s1a!="" ){
                        var s1de=myConvert(current.j3s1de);
                        var s1a=myConvert(current.j3s1a);
                        if( !( isNaN(s1de) || isNaN(s1a) ))
                            openingTime.push({dayNumber:2, open:1, openingHour:s1de, closingHour:s1a});
                        if(current.j3s2de!="" && current.j3s2a!="" ){
                            var s2de=myConvert(current.j3s2de);
                            var s2a=myConvert(current.j3s2a);
                            if( !( isNaN(s2de) || isNaN(s2a) ))
                                openingTime.push({dayNumber:2, open:1, openingHour:s2de, closingHour:s2a});
                        }
                    }
                    else
                    {
                        openingTime.push({dayNumber:2, open:1, openingHour:null, closingHour:null});
                    }
                }

                if(current.j4s==0){
                    openingTime.push({dayNumber:3, open:0});
                }
                else{
                    if(current.j4s1de!="" && current.j4s1a!="" ){
                        var s1de=myConvert(current.j4s1de);
                        var s1a=myConvert(current.j4s1a);
                        if( !( isNaN(s1de) || isNaN(s1a) ))
                            openingTime.push({dayNumber:3, open:1, openingHour:s1de, closingHour:s1a});
                        if(current.j4s2de!="" && current.j4s2a!="" ){
                            var s2de=myConvert(current.j4s2de);
                            var s2a=myConvert(current.j4s2a);
                            if( !( isNaN(s2de) || isNaN(s2a) ))
                                openingTime.push({dayNumber:3, open:1, openingHour:s2de, closingHour:s2a});
                        }
                    }
                    else
                    {
                        openingTime.push({dayNumber:3, open:1, openingHour:null, closingHour:null});
                    }
                }

                if(current.j5s==0){
                    openingTime.push({dayNumber:4, open:0});
                }
                else{
                    if(current.j5s1de!="" && current.j5s1a!="" ){
                        var s1de=myConvert(current.j5s1de);
                        var s1a=myConvert(current.j5s1a);
                        if( !( isNaN(s1de) || isNaN(s1a) ))
                            openingTime.push({dayNumber:4, open:1, openingHour:s1de, closingHour:s1a});
                        if(current.j5s2de!="" && current.j5s2a!="" ){
                            var s2de=myConvert(current.j5s2de);
                            var s2a=myConvert(current.j5s2a);
                            if( !( isNaN(s2de) || isNaN(s2a) ))
                                openingTime.push({dayNumber:4, open:1, openingHour:s2de, closingHour:s2a});
                        }
                    }
                    else
                    {
                        openingTime.push({dayNumber:4, open:1, openingHour:null, closingHour:null});
                    }
                }

                if(current.j6s==0){
                    openingTime.push({dayNumber:5, open:0});
                }
                else{
                    if(current.j6s1de!="" && current.j6s1a!="" ){
                        var s1de=myConvert(current.j6s1de);
                        var s1a=myConvert(current.j6s1a);
                        if( !( isNaN(s1de) || isNaN(s1a) ))
                            openingTime.push({dayNumber:5, open:1, openingHour:s1de, closingHour:s1a});
                        if(current.j6s2de!="" && current.j6s2a!="" ){
                            var s2de=myConvert(current.j6s2de);
                            var s2a=myConvert(current.j6s2a);
                            if( !( isNaN(s2de) || isNaN(s2a) ))
                                openingTime.push({dayNumber:5, open:1, openingHour:s2de, closingHour:s2a});
                        }
                    }
                    else
                    {
                        openingTime.push({dayNumber:5, open:1, openingHour:null, closingHour:null});
                    }
                }

                if(current.j7s==0){
                    openingTime.push({dayNumber:6, open:0});
                }
                else{
                    if(current.j7s1de!="" && current.j7s1a!="" ){
                        var s1de=myConvert(current.j7s1de);
                        var s1a=myConvert(current.j7s1a);
                        if( !( isNaN(s1de) || isNaN(s1a) ))
                            openingTime.push({dayNumber:6, open:1, openingHour:s1de, closingHour:s1a});
                        if(current.j7s2de!="" && current.j7s2a!="" ){
                            var s2de=myConvert(current.j7s2de);
                            var s2a=myConvert(current.j7s2a);
                            if( !( isNaN(s2de) || isNaN(s2a) ))
                                openingTime.push({dayNumber:6, open:1, openingHour:s2de, closingHour:s2a});
                        }
                    }
                    else
                    {
                        openingTime.push({dayNumber:6, open:1, openingHour:null, closingHour:null});
                    }
                }


                var gId=0;
                var dId=0;
                var tags=[];
                Gouvernera.find({'name':gouv}, function(err, docs){
                            if(docs.length>0){
                                gId=docs[0].id;
                                if(delegationCode!=0)
                                    delegationFn();
                                else
                                    tagFn();
                            }
                            else{
                                 var g = new Gouvernera({name:gouv});
                                 g.save(function(error){
                                    if (error) console.error('Not able to add gouvernera:', error);
                                    else {
                                        gId=g.id; 
                                        if(delegationCode!=0)
                                            delegationFn();
                                        else
                                            tagFn();
                                    }
                                });
                            }
                        });

                function delegationFn(){
                            Delegation.find({'postCode':delegationCode}, function(err, docs){
                                //console.log(docs);
                                if(docs.length>0){
                                    dId=docs[0].id;
                                    tagFn();
                                }
                                else{
                                    var d = new Delegation({postCode:delegationCode});
                                    d.save(function(error){
                                        if (error) console.error('Not able to add delegation :', error);
                                        else {
                                            dId=d.id;
                                            tagFn();
                                        }
                                    });
                                }
                            });
                        };

                function tagFn(){                        
                    Tag.find({'name':category}, function(err, docs3){
                        if(docs3.length>0){
                            tags.push(docs3[0].id);
                            tag2Fn();
                        }
                        else{
                            var t = new Tag({name:category});
                            t.save(function(error){
                               if (error) console.error('Not able to add Tag :', error); 
                                tags.push(t.id);
                                tag2Fn();
                            });
                        }
                    });
                };

                function tag2Fn(){                        
                    Tag.find({'name':sousCategory}, function(err, docs3){
                        if(docs3.length>0){
                            tags.push(docs3[0].id);
                            businessFn();
                        }
                        else{
                            var t = new Tag({name:sousCategory});
                            t.save(function(error){
                               if (error) console.error('Not able to add Tag 2 :', error); 
                                tags.push(t.id);
                                businessFn();
                            });
                        }
                    });
                };

                function businessFn(){
                    //console.log("gId:"+gId+"   dId  "+dId+" profileImage:"+profileImage);
                    if(dId==0)
                        dId=null;
                    var b = new Business({
                        name:name, 
                        description:description,
                        tel:tel,
                        longitude:longitude,
                        latitude:latitude,
                        adress:adress,
                        gouvernera:gId,
                        delegation:dId,
                        tag:tags,
                        serviceADomicile:serviceADomicile,
                        category:category,
                        sousCategory:sousCategory,
                        email:email,
                        site:site,
                        facebook:facebook,
                        googleplus:googleplus,
                        openingTime:openingTime,
                        profileImage:profileImage,
                        urlScrape:urlScrape

                    });
                    tags=[];
                    openingTime=[];
                    b.save(function(error){
                        if (error) console.error('Not able to add business:', error);
                        else{
                            //console.log("Business Aded");
                        }
                    });



                    i++;
                    if(i<body.length){
                        step();
                    }
                    else
                        go();
                    //   response2.json(body);  

                };

            };
        });
        
        }
        };
    
    
    return;

};
function scrapeModeHabillement(request2, response2) {
    //max:874
    var debut=0;
    var fin=51;
    
    go();
    
    function go(){
        debut++;
        if(debut>fin){
            response2.json("finish");
            return;
        }
        else
        {
        request.post({
          headers: {'content-type' : 'multipart/form-data; boundary=----WebKitFormBoundaryUo8aX5tAuE19CcSX'},
          url:     'http://www.bonnes-adresses.tn/adresses-sante-a-tunisie.html?enticache=0.44762341329109634&api=pagination',
          body:'------WebKitFormBoundaryUo8aX5tAuE19CcSX\nContent-Disposition: form-data; name="jsonDataApiTransfert\n\n{"page":'+debut+',"filter":{"categorie":"8","ville":"Tunisie"}}\n------WebKitFormBoundaryUo8aX5tAuE19CcSX--'
        }, function(error, response, body)
         {
            body=JSON.parse(body);
            body=body.master_data.data;
            var i=0;
            step();
            function step(){
                var current=body[i];

                var name=current.titre;
                var adress=current.adresse;
                var description=current.description;
                var tel=current.tel;
                var email=current.email;
                var site=current.site;
                var facebook=current.facebook;
                var googleplus=current.googleplus;
                var longitude=current.marker[0];
                if(longitude!=0)
                    var latitude=current.marker[1];
                else
                    var latitude=0;

                var sousCategory=current.categorie;
                var category='Mode et Habillement';

                if(current.service_a_domicile==0)
                    var serviceADomicile=false;
                else
                    var serviceADomicile=true;
                var gouv=current.ville;
                var urlScrape=current.url;
                var delegationCode=current.cp;
                var profileImage=current.photo;
                if(profileImage.indexOf('no_photo')!=-1 || profileImage.indexOf('gravatar')!=-1){
                    profileImage='default.png';
                }
                else{
                    var uri = Math.round(+new Date()/1000);  
                    profileImage=uri+'.jpg';
                    request(current.photo, {encoding: 'binary'}, function(error, response, bodyImg) {
                      fs.writeFile('public/img/bimg/'+profileImage, bodyImg, 'binary', function (err) {});
                    });
                }
                var openingTime=[];
                if(current.j1s==0){
                    openingTime.push({dayNumber:0, open:0});
                }
                else{
                    if(current.j1s1de!="" && current.j1s1a!=""){
                        var s1de=myConvert(current.j1s1de);
                        var s1a=myConvert(current.j1s1a);
                        if( !( isNaN(s1de) || isNaN(s1a) ))
                            openingTime.push({dayNumber:0, open:1, openingHour:s1de, closingHour:s1a});
                        if(current.j1s2de!="" && current.j1s2a!=""){
                            var s2de=myConvert(current.j1s2de);
                            var s2a=myConvert(current.j1s2a);
                            if( !( isNaN(s2de) || isNaN(s2a) ))
                                openingTime.push({dayNumber:0, open:1, openingHour:s2de, closingHour:s2a});
                    }
                    }
                    else
                    {
                        openingTime.push({dayNumber:0, open:1, openingHour:null, closingHour:null});
                    }
                }

                if(current.j2s==0){
                    openingTime.push({dayNumber:1, open:0});
                }
                else{
                    if(current.j2s1de!="" && current.j2s1a!=""){
                        var s1de=myConvert(current.j2s1de);
                        var s1a=myConvert(current.j2s1a);
                        if( !( isNaN(s1de) || isNaN(s1a) ))
                            openingTime.push({dayNumber:1, open:1, openingHour:s1de, closingHour:s1a});
                        if(current.j2s2de!="" && current.j2s2a!="" ){
                            var s2de=myConvert(current.j2s2de);
                            var s2a=myConvert(current.j2s2a);
                            if( !( isNaN(s2de) || isNaN(s2a) ))
                                openingTime.push({dayNumber:1, open:1, openingHour:s2de, closingHour:s2a});
                        }
                    }
                    else
                    {
                        openingTime.push({dayNumber:1, open:1, openingHour:null, closingHour:null});
                    }
                }

                if(current.j3s==0){
                    openingTime.push({dayNumber:2, open:0});
                }
                else{
                    if(current.j3s1de!="" && current.j3s1a!="" ){
                        var s1de=myConvert(current.j3s1de);
                        var s1a=myConvert(current.j3s1a);
                        if( !( isNaN(s1de) || isNaN(s1a) ))
                            openingTime.push({dayNumber:2, open:1, openingHour:s1de, closingHour:s1a});
                        if(current.j3s2de!="" && current.j3s2a!="" ){
                            var s2de=myConvert(current.j3s2de);
                            var s2a=myConvert(current.j3s2a);
                            if( !( isNaN(s2de) || isNaN(s2a) ))
                                openingTime.push({dayNumber:2, open:1, openingHour:s2de, closingHour:s2a});
                        }
                    }
                    else
                    {
                        openingTime.push({dayNumber:2, open:1, openingHour:null, closingHour:null});
                    }
                }

                if(current.j4s==0){
                    openingTime.push({dayNumber:3, open:0});
                }
                else{
                    if(current.j4s1de!="" && current.j4s1a!="" ){
                        var s1de=myConvert(current.j4s1de);
                        var s1a=myConvert(current.j4s1a);
                        if( !( isNaN(s1de) || isNaN(s1a) ))
                            openingTime.push({dayNumber:3, open:1, openingHour:s1de, closingHour:s1a});
                        if(current.j4s2de!="" && current.j4s2a!="" ){
                            var s2de=myConvert(current.j4s2de);
                            var s2a=myConvert(current.j4s2a);
                            if( !( isNaN(s2de) || isNaN(s2a) ))
                                openingTime.push({dayNumber:3, open:1, openingHour:s2de, closingHour:s2a});
                        }
                    }
                    else
                    {
                        openingTime.push({dayNumber:3, open:1, openingHour:null, closingHour:null});
                    }
                }

                if(current.j5s==0){
                    openingTime.push({dayNumber:4, open:0});
                }
                else{
                    if(current.j5s1de!="" && current.j5s1a!="" ){
                        var s1de=myConvert(current.j5s1de);
                        var s1a=myConvert(current.j5s1a);
                        if( !( isNaN(s1de) || isNaN(s1a) ))
                            openingTime.push({dayNumber:4, open:1, openingHour:s1de, closingHour:s1a});
                        if(current.j5s2de!="" && current.j5s2a!="" ){
                            var s2de=myConvert(current.j5s2de);
                            var s2a=myConvert(current.j5s2a);
                            if( !( isNaN(s2de) || isNaN(s2a) ))
                                openingTime.push({dayNumber:4, open:1, openingHour:s2de, closingHour:s2a});
                        }
                    }
                    else
                    {
                        openingTime.push({dayNumber:4, open:1, openingHour:null, closingHour:null});
                    }
                }

                if(current.j6s==0){
                    openingTime.push({dayNumber:5, open:0});
                }
                else{
                    if(current.j6s1de!="" && current.j6s1a!="" ){
                        var s1de=myConvert(current.j6s1de);
                        var s1a=myConvert(current.j6s1a);
                        if( !( isNaN(s1de) || isNaN(s1a) ))
                            openingTime.push({dayNumber:5, open:1, openingHour:s1de, closingHour:s1a});
                        if(current.j6s2de!="" && current.j6s2a!="" ){
                            var s2de=myConvert(current.j6s2de);
                            var s2a=myConvert(current.j6s2a);
                            if( !( isNaN(s2de) || isNaN(s2a) ))
                                openingTime.push({dayNumber:5, open:1, openingHour:s2de, closingHour:s2a});
                        }
                    }
                    else
                    {
                        openingTime.push({dayNumber:5, open:1, openingHour:null, closingHour:null});
                    }
                }

                if(current.j7s==0){
                    openingTime.push({dayNumber:6, open:0});
                }
                else{
                    if(current.j7s1de!="" && current.j7s1a!="" ){
                        var s1de=myConvert(current.j7s1de);
                        var s1a=myConvert(current.j7s1a);
                        if( !( isNaN(s1de) || isNaN(s1a) ))
                            openingTime.push({dayNumber:6, open:1, openingHour:s1de, closingHour:s1a});
                        if(current.j7s2de!="" && current.j7s2a!="" ){
                            var s2de=myConvert(current.j7s2de);
                            var s2a=myConvert(current.j7s2a);
                            if( !( isNaN(s2de) || isNaN(s2a) ))
                                openingTime.push({dayNumber:6, open:1, openingHour:s2de, closingHour:s2a});
                        }
                    }
                    else
                    {
                        openingTime.push({dayNumber:6, open:1, openingHour:null, closingHour:null});
                    }
                }


                var gId=0;
                var dId=0;
                var tags=[];
                Gouvernera.find({'name':gouv}, function(err, docs){
                            if(docs.length>0){
                                gId=docs[0].id;
                                if(delegationCode!=0)
                                    delegationFn();
                                else
                                    tagFn();
                            }
                            else{
                                 var g = new Gouvernera({name:gouv});
                                 g.save(function(error){
                                    if (error) console.error('Not able to add gouvernera:', error);
                                    else {
                                        gId=g.id; 
                                        if(delegationCode!=0)
                                            delegationFn();
                                        else
                                            tagFn();
                                    }
                                });
                            }
                        });

                function delegationFn(){
                            Delegation.find({'postCode':delegationCode}, function(err, docs){
                                //console.log(docs);
                                if(docs.length>0){
                                    dId=docs[0].id;
                                    tagFn();
                                }
                                else{
                                    var d = new Delegation({postCode:delegationCode});
                                    d.save(function(error){
                                        if (error) console.error('Not able to add delegation :', error);
                                        else {
                                            dId=d.id;
                                            tagFn();
                                        }
                                    });
                                }
                            });
                        };

                function tagFn(){                        
                    Tag.find({'name':category}, function(err, docs3){
                        if(docs3.length>0){
                            tags.push(docs3[0].id);
                            tag2Fn();
                        }
                        else{
                            var t = new Tag({name:category});
                            t.save(function(error){
                               if (error) console.error('Not able to add Tag :', error); 
                                tags.push(t.id);
                                tag2Fn();
                            });
                        }
                    });
                };

                function tag2Fn(){                        
                    Tag.find({'name':sousCategory}, function(err, docs3){
                        if(docs3.length>0){
                            tags.push(docs3[0].id);
                            businessFn();
                        }
                        else{
                            var t = new Tag({name:sousCategory});
                            t.save(function(error){
                               if (error) console.error('Not able to add Tag 2 :', error); 
                                tags.push(t.id);
                                businessFn();
                            });
                        }
                    });
                };

                function businessFn(){
                    //console.log("gId:"+gId+"   dId  "+dId+" profileImage:"+profileImage);
                    if(dId==0)
                        dId=null;
                    var b = new Business({
                        name:name, 
                        description:description,
                        tel:tel,
                        longitude:longitude,
                        latitude:latitude,
                        adress:adress,
                        gouvernera:gId,
                        delegation:dId,
                        tag:tags,
                        serviceADomicile:serviceADomicile,
                        category:category,
                        sousCategory:sousCategory,
                        email:email,
                        site:site,
                        facebook:facebook,
                        googleplus:googleplus,
                        openingTime:openingTime,
                        profileImage:profileImage,
                        urlScrape:urlScrape

                    });
                    tags=[];
                    openingTime=[];
                    b.save(function(error){
                        if (error) console.error('Not able to add business:', error);
                        else{
                            //console.log("Business Aded");
                        }
                    });



                    i++;
                    if(i<body.length){
                        step();
                    }
                    else
                        go();
                    //   response2.json(body);  

                };

            };
        });
        
        }
        };
    
    
    return;

};
function scrapeFournitureAdministratif(request2, response2) {
    //max:874
    var debut=1;
    var fin=807;
    
    go();
    
    function go(){
        debut++;
        if(debut>fin){
            response2.json("finish");
            return;
        }
        else
        {
        request.post({
          headers: {'content-type' : 'multipart/form-data; boundary=----WebKitFormBoundaryUo8aX5tAuE19CcSX'},
          url:     'http://www.bonnes-adresses.tn/adresses-sante-a-tunisie.html?enticache=0.44762341329109634&api=pagination',
          body:'------WebKitFormBoundaryUo8aX5tAuE19CcSX\nContent-Disposition: form-data; name="jsonDataApiTransfert\n\n{"page":'+debut+',"filter":{"categorie":"196","ville":"Tunisie"}}\n------WebKitFormBoundaryUo8aX5tAuE19CcSX--'
        }, function(error, response, body)
         {
            body=JSON.parse(body);
            body=body.master_data.data;
            var i=0;
            step();
            function step(){
                var current=body[i];

                var name=current.titre;
                var adress=current.adresse;
                var description=current.description;
                var tel=current.tel;
                var email=current.email;
                var site=current.site;
                var facebook=current.facebook;
                var googleplus=current.googleplus;
                var longitude=current.marker[0];
                if (current.marker && current.marker[0] )
                {   var longitude=current.marker[0];
                    if(longitude!=0)
                        var latitude=current.marker[1];
                    else
                        var latitude=0;
                }

                var sousCategory=current.categorie;
                var category='Fournitures Administratifs';

                if(current.service_a_domicile==0)
                    var serviceADomicile=false;
                else
                    var serviceADomicile=true;
                var gouv=current.ville;
                var urlScrape=current.url;
                var delegationCode=current.cp;
                var profileImage=current.photo;
                if(profileImage.indexOf('no_photo')!=-1 || profileImage.indexOf('gravatar')!=-1){
                    profileImage='default.png';
                }
                else{
                    var uri = Math.round(+new Date()/1000);  
                    profileImage=uri+'.jpg';
                    request(current.photo, {encoding: 'binary'}, function(error, response, bodyImg) {
                      fs.writeFile('public/img/bimg/'+profileImage, bodyImg, 'binary', function (err) {});
                    });
                }
                var openingTime=[];
                if(current.j1s==0){
                    openingTime.push({dayNumber:0, open:0});
                }
                else{
                    if(current.j1s1de!="" && current.j1s1a!=""){
                        var s1de=myConvert(current.j1s1de);
                        var s1a=myConvert(current.j1s1a);
                        if( !( isNaN(s1de) || isNaN(s1a) ))
                            openingTime.push({dayNumber:0, open:1, openingHour:s1de, closingHour:s1a});
                        if(current.j1s2de!="" && current.j1s2a!=""){
                            var s2de=myConvert(current.j1s2de);
                            var s2a=myConvert(current.j1s2a);
                            if( !( isNaN(s2de) || isNaN(s2a) ))
                                openingTime.push({dayNumber:0, open:1, openingHour:s2de, closingHour:s2a});
                    }
                    }
                    else
                    {
                        openingTime.push({dayNumber:0, open:1, openingHour:null, closingHour:null});
                    }
                }

                if(current.j2s==0){
                    openingTime.push({dayNumber:1, open:0});
                }
                else{
                    if(current.j2s1de!="" && current.j2s1a!=""){
                        var s1de=myConvert(current.j2s1de);
                        var s1a=myConvert(current.j2s1a);
                        if( !( isNaN(s1de) || isNaN(s1a) ))
                            openingTime.push({dayNumber:1, open:1, openingHour:s1de, closingHour:s1a});
                        if(current.j2s2de!="" && current.j2s2a!="" ){
                            var s2de=myConvert(current.j2s2de);
                            var s2a=myConvert(current.j2s2a);
                            if( !( isNaN(s2de) || isNaN(s2a) ))
                                openingTime.push({dayNumber:1, open:1, openingHour:s2de, closingHour:s2a});
                        }
                    }
                    else
                    {
                        openingTime.push({dayNumber:1, open:1, openingHour:null, closingHour:null});
                    }
                }

                if(current.j3s==0){
                    openingTime.push({dayNumber:2, open:0});
                }
                else{
                    if(current.j3s1de!="" && current.j3s1a!="" ){
                        var s1de=myConvert(current.j3s1de);
                        var s1a=myConvert(current.j3s1a);
                        if( !( isNaN(s1de) || isNaN(s1a) ))
                            openingTime.push({dayNumber:2, open:1, openingHour:s1de, closingHour:s1a});
                        if(current.j3s2de!="" && current.j3s2a!="" ){
                            var s2de=myConvert(current.j3s2de);
                            var s2a=myConvert(current.j3s2a);
                            if( !( isNaN(s2de) || isNaN(s2a) ))
                                openingTime.push({dayNumber:2, open:1, openingHour:s2de, closingHour:s2a});
                        }
                    }
                    else
                    {
                        openingTime.push({dayNumber:2, open:1, openingHour:null, closingHour:null});
                    }
                }

                if(current.j4s==0){
                    openingTime.push({dayNumber:3, open:0});
                }
                else{
                    if(current.j4s1de!="" && current.j4s1a!="" ){
                        var s1de=myConvert(current.j4s1de);
                        var s1a=myConvert(current.j4s1a);
                        if( !( isNaN(s1de) || isNaN(s1a) ))
                            openingTime.push({dayNumber:3, open:1, openingHour:s1de, closingHour:s1a});
                        if(current.j4s2de!="" && current.j4s2a!="" ){
                            var s2de=myConvert(current.j4s2de);
                            var s2a=myConvert(current.j4s2a);
                            if( !( isNaN(s2de) || isNaN(s2a) ))
                                openingTime.push({dayNumber:3, open:1, openingHour:s2de, closingHour:s2a});
                        }
                    }
                    else
                    {
                        openingTime.push({dayNumber:3, open:1, openingHour:null, closingHour:null});
                    }
                }

                if(current.j5s==0){
                    openingTime.push({dayNumber:4, open:0});
                }
                else{
                    if(current.j5s1de!="" && current.j5s1a!="" ){
                        var s1de=myConvert(current.j5s1de);
                        var s1a=myConvert(current.j5s1a);
                        if( !( isNaN(s1de) || isNaN(s1a) ))
                            openingTime.push({dayNumber:4, open:1, openingHour:s1de, closingHour:s1a});
                        if(current.j5s2de!="" && current.j5s2a!="" ){
                            var s2de=myConvert(current.j5s2de);
                            var s2a=myConvert(current.j5s2a);
                            if( !( isNaN(s2de) || isNaN(s2a) ))
                                openingTime.push({dayNumber:4, open:1, openingHour:s2de, closingHour:s2a});
                        }
                    }
                    else
                    {
                        openingTime.push({dayNumber:4, open:1, openingHour:null, closingHour:null});
                    }
                }

                if(current.j6s==0){
                    openingTime.push({dayNumber:5, open:0});
                }
                else{
                    if(current.j6s1de!="" && current.j6s1a!="" ){
                        var s1de=myConvert(current.j6s1de);
                        var s1a=myConvert(current.j6s1a);
                        if( !( isNaN(s1de) || isNaN(s1a) ))
                            openingTime.push({dayNumber:5, open:1, openingHour:s1de, closingHour:s1a});
                        if(current.j6s2de!="" && current.j6s2a!="" ){
                            var s2de=myConvert(current.j6s2de);
                            var s2a=myConvert(current.j6s2a);
                            if( !( isNaN(s2de) || isNaN(s2a) ))
                                openingTime.push({dayNumber:5, open:1, openingHour:s2de, closingHour:s2a});
                        }
                    }
                    else
                    {
                        openingTime.push({dayNumber:5, open:1, openingHour:null, closingHour:null});
                    }
                }

                if(current.j7s==0){
                    openingTime.push({dayNumber:6, open:0});
                }
                else{
                    if(current.j7s1de!="" && current.j7s1a!="" ){
                        var s1de=myConvert(current.j7s1de);
                        var s1a=myConvert(current.j7s1a);
                        if( !( isNaN(s1de) || isNaN(s1a) ))
                            openingTime.push({dayNumber:6, open:1, openingHour:s1de, closingHour:s1a});
                        if(current.j7s2de!="" && current.j7s2a!="" ){
                            var s2de=myConvert(current.j7s2de);
                            var s2a=myConvert(current.j7s2a);
                            if( !( isNaN(s2de) || isNaN(s2a) ))
                                openingTime.push({dayNumber:6, open:1, openingHour:s2de, closingHour:s2a});
                        }
                    }
                    else
                    {
                        openingTime.push({dayNumber:6, open:1, openingHour:null, closingHour:null});
                    }
                }


                var gId=0;
                var dId=0;
                var tags=[];
                Gouvernera.find({'name':gouv}, function(err, docs){
                            if(docs.length>0){
                                gId=docs[0].id;
                                if(delegationCode!=0)
                                    delegationFn();
                                else
                                    tagFn();
                            }
                            else{
                                 var g = new Gouvernera({name:gouv});
                                 g.save(function(error){
                                    if (error) console.error('Not able to add gouvernera:', error);
                                    else {
                                        gId=g.id; 
                                        if(delegationCode!=0)
                                            delegationFn();
                                        else
                                            tagFn();
                                    }
                                });
                            }
                        });

                function delegationFn(){
                            Delegation.find({'postCode':delegationCode}, function(err, docs){
                                //console.log(docs);
                                if(docs.length>0){
                                    dId=docs[0].id;
                                    tagFn();
                                }
                                else{
                                    var d = new Delegation({postCode:delegationCode});
                                    d.save(function(error){
                                        if (error) console.error('Not able to add delegation :', error);
                                        else {
                                            dId=d.id;
                                            tagFn();
                                        }
                                    });
                                }
                            });
                        };

                function tagFn(){                        
                    Tag.find({'name':category}, function(err, docs3){
                        if(docs3.length>0){
                            tags.push(docs3[0].id);
                            tag2Fn();
                        }
                        else{
                            var t = new Tag({name:category});
                            t.save(function(error){
                               if (error) console.error('Not able to add Tag :', error); 
                                tags.push(t.id);
                                tag2Fn();
                            });
                        }
                    });
                };

                function tag2Fn(){                        
                    Tag.find({'name':sousCategory}, function(err, docs3){
                        if(docs3.length>0){
                            tags.push(docs3[0].id);
                            businessFn();
                        }
                        else{
                            var t = new Tag({name:sousCategory});
                            t.save(function(error){
                               if (error) console.error('Not able to add Tag 2 :', error); 
                                tags.push(t.id);
                                businessFn();
                            });
                        }
                    });
                };

                function businessFn(){
                    //console.log("gId:"+gId+"   dId  "+dId+" profileImage:"+profileImage);
                    if(dId==0)
                        dId=null;
                    var b = new Business({
                        name:name, 
                        description:description,
                        tel:tel,
                        longitude:longitude,
                        latitude:latitude,
                        adress:adress,
                        gouvernera:gId,
                        delegation:dId,
                        tag:tags,
                        serviceADomicile:serviceADomicile,
                        category:category,
                        sousCategory:sousCategory,
                        email:email,
                        site:site,
                        facebook:facebook,
                        googleplus:googleplus,
                        openingTime:openingTime,
                        profileImage:profileImage,
                        urlScrape:urlScrape

                    });
                    tags=[];
                    openingTime=[];
                    b.save(function(error){
                        if (error) console.error('Not able to add business:', error);
                        else{
                            //console.log("Business Aded");
                        }
                    });



                    i++;
                    if(i<body.length){
                        step();
                    }
                    else
                        go();
                    //   response2.json(body);  

                };

            };
        });
        
        }
        };
    
    
    return;

};
function scrapeMaisonDeco(request2, response2) {
    //max:874
    var debut=1;
    var fin=94;
    
    go();
    
    function go(){
        debut++;
        if(debut>fin){
            response2.json("finish");
            return;
        }
        else
        {
        request.post({
          headers: {'content-type' : 'multipart/form-data; boundary=----WebKitFormBoundaryUo8aX5tAuE19CcSX'},
          url:     'http://www.bonnes-adresses.tn/adresses-sante-a-tunisie.html?enticache=0.44762341329109634&api=pagination',
          body:'------WebKitFormBoundaryUo8aX5tAuE19CcSX\nContent-Disposition: form-data; name="jsonDataApiTransfert\n\n{"page":'+debut+',"filter":{"categorie":"208","ville":"Tunisie"}}\n------WebKitFormBoundaryUo8aX5tAuE19CcSX--'
        }, function(error, response, body)
         {
            body=JSON.parse(body);
            body=body.master_data.data;
            var i=0;
            step();
            function step(){
                var current=body[i];

                var name=current.titre;
                var adress=current.adresse;
                var description=current.description;
                var tel=current.tel;
                var email=current.email;
                var site=current.site;
                var facebook=current.facebook;
                var googleplus=current.googleplus;
                var longitude=current.marker[0];
                if(longitude!=0)
                    var latitude=current.marker[1];
                else
                    var latitude=0;

                var sousCategory=current.categorie;
                var category='Maison et Deco';

                if(current.service_a_domicile==0)
                    var serviceADomicile=false;
                else
                    var serviceADomicile=true;
                var gouv=current.ville;
                var urlScrape=current.url;
                var delegationCode=current.cp;
                var profileImage=current.photo;
                if(profileImage.indexOf('no_photo')!=-1 || profileImage.indexOf('gravatar')!=-1){
                    profileImage='default.png';
                }
                else{
                    var uri = Math.round(+new Date()/1000);  
                    profileImage=uri+'.jpg';
                    request(current.photo, {encoding: 'binary'}, function(error, response, bodyImg) {
                      fs.writeFile('public/img/bimg/'+profileImage, bodyImg, 'binary', function (err) {});
                    });
                }
                var openingTime=[];
                if(current.j1s==0){
                    openingTime.push({dayNumber:0, open:0});
                }
                else{
                    if(current.j1s1de!="" && current.j1s1a!=""){
                        var s1de=myConvert(current.j1s1de);
                        var s1a=myConvert(current.j1s1a);
                        if( !( isNaN(s1de) || isNaN(s1a) ))
                            openingTime.push({dayNumber:0, open:1, openingHour:s1de, closingHour:s1a});
                        if(current.j1s2de!="" && current.j1s2a!=""){
                            var s2de=myConvert(current.j1s2de);
                            var s2a=myConvert(current.j1s2a);
                            if( !( isNaN(s2de) || isNaN(s2a) ))
                                openingTime.push({dayNumber:0, open:1, openingHour:s2de, closingHour:s2a});
                    }
                    }
                    else
                    {
                        openingTime.push({dayNumber:0, open:1, openingHour:null, closingHour:null});
                    }
                }

                if(current.j2s==0){
                    openingTime.push({dayNumber:1, open:0});
                }
                else{
                    if(current.j2s1de!="" && current.j2s1a!=""){
                        var s1de=myConvert(current.j2s1de);
                        var s1a=myConvert(current.j2s1a);
                        if( !( isNaN(s1de) || isNaN(s1a) ))
                            openingTime.push({dayNumber:1, open:1, openingHour:s1de, closingHour:s1a});
                        if(current.j2s2de!="" && current.j2s2a!="" ){
                            var s2de=myConvert(current.j2s2de);
                            var s2a=myConvert(current.j2s2a);
                            if( !( isNaN(s2de) || isNaN(s2a) ))
                                openingTime.push({dayNumber:1, open:1, openingHour:s2de, closingHour:s2a});
                        }
                    }
                    else
                    {
                        openingTime.push({dayNumber:1, open:1, openingHour:null, closingHour:null});
                    }
                }

                if(current.j3s==0){
                    openingTime.push({dayNumber:2, open:0});
                }
                else{
                    if(current.j3s1de!="" && current.j3s1a!="" ){
                        var s1de=myConvert(current.j3s1de);
                        var s1a=myConvert(current.j3s1a);
                        if( !( isNaN(s1de) || isNaN(s1a) ))
                            openingTime.push({dayNumber:2, open:1, openingHour:s1de, closingHour:s1a});
                        if(current.j3s2de!="" && current.j3s2a!="" ){
                            var s2de=myConvert(current.j3s2de);
                            var s2a=myConvert(current.j3s2a);
                            if( !( isNaN(s2de) || isNaN(s2a) ))
                                openingTime.push({dayNumber:2, open:1, openingHour:s2de, closingHour:s2a});
                        }
                    }
                    else
                    {
                        openingTime.push({dayNumber:2, open:1, openingHour:null, closingHour:null});
                    }
                }

                if(current.j4s==0){
                    openingTime.push({dayNumber:3, open:0});
                }
                else{
                    if(current.j4s1de!="" && current.j4s1a!="" ){
                        var s1de=myConvert(current.j4s1de);
                        var s1a=myConvert(current.j4s1a);
                        if( !( isNaN(s1de) || isNaN(s1a) ))
                            openingTime.push({dayNumber:3, open:1, openingHour:s1de, closingHour:s1a});
                        if(current.j4s2de!="" && current.j4s2a!="" ){
                            var s2de=myConvert(current.j4s2de);
                            var s2a=myConvert(current.j4s2a);
                            if( !( isNaN(s2de) || isNaN(s2a) ))
                                openingTime.push({dayNumber:3, open:1, openingHour:s2de, closingHour:s2a});
                        }
                    }
                    else
                    {
                        openingTime.push({dayNumber:3, open:1, openingHour:null, closingHour:null});
                    }
                }

                if(current.j5s==0){
                    openingTime.push({dayNumber:4, open:0});
                }
                else{
                    if(current.j5s1de!="" && current.j5s1a!="" ){
                        var s1de=myConvert(current.j5s1de);
                        var s1a=myConvert(current.j5s1a);
                        if( !( isNaN(s1de) || isNaN(s1a) ))
                            openingTime.push({dayNumber:4, open:1, openingHour:s1de, closingHour:s1a});
                        if(current.j5s2de!="" && current.j5s2a!="" ){
                            var s2de=myConvert(current.j5s2de);
                            var s2a=myConvert(current.j5s2a);
                            if( !( isNaN(s2de) || isNaN(s2a) ))
                                openingTime.push({dayNumber:4, open:1, openingHour:s2de, closingHour:s2a});
                        }
                    }
                    else
                    {
                        openingTime.push({dayNumber:4, open:1, openingHour:null, closingHour:null});
                    }
                }

                if(current.j6s==0){
                    openingTime.push({dayNumber:5, open:0});
                }
                else{
                    if(current.j6s1de!="" && current.j6s1a!="" ){
                        var s1de=myConvert(current.j6s1de);
                        var s1a=myConvert(current.j6s1a);
                        if( !( isNaN(s1de) || isNaN(s1a) ))
                            openingTime.push({dayNumber:5, open:1, openingHour:s1de, closingHour:s1a});
                        if(current.j6s2de!="" && current.j6s2a!="" ){
                            var s2de=myConvert(current.j6s2de);
                            var s2a=myConvert(current.j6s2a);
                            if( !( isNaN(s2de) || isNaN(s2a) ))
                                openingTime.push({dayNumber:5, open:1, openingHour:s2de, closingHour:s2a});
                        }
                    }
                    else
                    {
                        openingTime.push({dayNumber:5, open:1, openingHour:null, closingHour:null});
                    }
                }

                if(current.j7s==0){
                    openingTime.push({dayNumber:6, open:0});
                }
                else{
                    if(current.j7s1de!="" && current.j7s1a!="" ){
                        var s1de=myConvert(current.j7s1de);
                        var s1a=myConvert(current.j7s1a);
                        if( !( isNaN(s1de) || isNaN(s1a) ))
                            openingTime.push({dayNumber:6, open:1, openingHour:s1de, closingHour:s1a});
                        if(current.j7s2de!="" && current.j7s2a!="" ){
                            var s2de=myConvert(current.j7s2de);
                            var s2a=myConvert(current.j7s2a);
                            if( !( isNaN(s2de) || isNaN(s2a) ))
                                openingTime.push({dayNumber:6, open:1, openingHour:s2de, closingHour:s2a});
                        }
                    }
                    else
                    {
                        openingTime.push({dayNumber:6, open:1, openingHour:null, closingHour:null});
                    }
                }


                var gId=0;
                var dId=0;
                var tags=[];
                Gouvernera.find({'name':gouv}, function(err, docs){
                            if(docs.length>0){
                                gId=docs[0].id;
                                if(delegationCode!=0)
                                    delegationFn();
                                else
                                    tagFn();
                            }
                            else{
                                 var g = new Gouvernera({name:gouv});
                                 g.save(function(error){
                                    if (error) console.error('Not able to add gouvernera:', error);
                                    else {
                                        gId=g.id; 
                                        if(delegationCode!=0)
                                            delegationFn();
                                        else
                                            tagFn();
                                    }
                                });
                            }
                        });

                function delegationFn(){
                            Delegation.find({'postCode':delegationCode}, function(err, docs){
                                //console.log(docs);
                                if(docs.length>0){
                                    dId=docs[0].id;
                                    tagFn();
                                }
                                else{
                                    var d = new Delegation({postCode:delegationCode});
                                    d.save(function(error){
                                        if (error) console.error('Not able to add delegation :', error);
                                        else {
                                            dId=d.id;
                                            tagFn();
                                        }
                                    });
                                }
                            });
                        };

                function tagFn(){                        
                    Tag.find({'name':category}, function(err, docs3){
                        if(docs3.length>0){
                            tags.push(docs3[0].id);
                            tag2Fn();
                        }
                        else{
                            var t = new Tag({name:category});
                            t.save(function(error){
                               if (error) console.error('Not able to add Tag :', error); 
                                tags.push(t.id);
                                tag2Fn();
                            });
                        }
                    });
                };

                function tag2Fn(){                        
                    Tag.find({'name':sousCategory}, function(err, docs3){
                        if(docs3.length>0){
                            tags.push(docs3[0].id);
                            businessFn();
                        }
                        else{
                            var t = new Tag({name:sousCategory});
                            t.save(function(error){
                               if (error) console.error('Not able to add Tag 2 :', error); 
                                tags.push(t.id);
                                businessFn();
                            });
                        }
                    });
                };

                function businessFn(){
                    //console.log("gId:"+gId+"   dId  "+dId+" profileImage:"+profileImage);
                    if(dId==0)
                        dId=null;
                    var b = new Business({
                        name:name, 
                        description:description,
                        tel:tel,
                        longitude:longitude,
                        latitude:latitude,
                        adress:adress,
                        gouvernera:gId,
                        delegation:dId,
                        tag:tags,
                        serviceADomicile:serviceADomicile,
                        category:category,
                        sousCategory:sousCategory,
                        email:email,
                        site:site,
                        facebook:facebook,
                        googleplus:googleplus,
                        openingTime:openingTime,
                        profileImage:profileImage,
                        urlScrape:urlScrape

                    });
                    tags=[];
                    openingTime=[];
                    b.save(function(error){
                        if (error) console.error('Not able to add business:', error);
                        else{
                            //console.log("Business Aded");
                        }
                    });



                    i++;
                    if(i<body.length){
                        step();
                    }
                    else
                        go();
                    //   response2.json(body);  

                };

            };
        });
        
        }
        };
    
    
    return;

};
function scrapeSortie(request2, response2) {
    //max:874
    var debut=1;
    var fin=74;
    
    go();
    
    function go(){
        debut++;
        if(debut>fin){
            response2.json("finish");
            return;
        }
        else
        {
        request.post({
          headers: {'content-type' : 'multipart/form-data; boundary=----WebKitFormBoundaryUo8aX5tAuE19CcSX'},
          url:     'http://www.bonnes-adresses.tn/adresses-sante-a-tunisie.html?enticache=0.44762341329109634&api=pagination',
          body:'------WebKitFormBoundaryUo8aX5tAuE19CcSX\nContent-Disposition: form-data; name="jsonDataApiTransfert\n\n{"page":'+debut+',"filter":{"categorie":"234","ville":"Tunisie"}}\n------WebKitFormBoundaryUo8aX5tAuE19CcSX--'
        }, function(error, response, body)
         {
            body=JSON.parse(body);
            body=body.master_data.data;
            var i=0;
            step();
            function step(){
                var current=body[i];

                var name=current.titre;
                var adress=current.adresse;
                var description=current.description;
                var tel=current.tel;
                var email=current.email;
                var site=current.site;
                var facebook=current.facebook;
                var googleplus=current.googleplus;
                var longitude=current.marker[0];
                if(longitude!=0)
                    var latitude=current.marker[1];
                else
                    var latitude=0;

                var sousCategory=current.categorie;
                var category='Sortie';

                if(current.service_a_domicile==0)
                    var serviceADomicile=false;
                else
                    var serviceADomicile=true;
                var gouv=current.ville;
                var urlScrape=current.url;
                var delegationCode=current.cp;
                var profileImage=current.photo;
                if(profileImage.indexOf('no_photo')!=-1 || profileImage.indexOf('gravatar')!=-1){
                    profileImage='default.png';
                }
                else{
                    var uri = Math.round(+new Date()/1000);  
                    profileImage=uri+'.jpg';
                    request(current.photo, {encoding: 'binary'}, function(error, response, bodyImg) {
                      fs.writeFile('public/img/bimg/'+profileImage, bodyImg, 'binary', function (err) {});
                    });
                }
                var openingTime=[];
                if(current.j1s==0){
                    openingTime.push({dayNumber:0, open:0});
                }
                else{
                    if(current.j1s1de!="" && current.j1s1a!=""){
                        var s1de=myConvert(current.j1s1de);
                        var s1a=myConvert(current.j1s1a);
                        if( !( isNaN(s1de) || isNaN(s1a) ))
                            openingTime.push({dayNumber:0, open:1, openingHour:s1de, closingHour:s1a});
                        if(current.j1s2de!="" && current.j1s2a!=""){
                            var s2de=myConvert(current.j1s2de);
                            var s2a=myConvert(current.j1s2a);
                            if( !( isNaN(s2de) || isNaN(s2a) ))
                                openingTime.push({dayNumber:0, open:1, openingHour:s2de, closingHour:s2a});
                    }
                    }
                    else
                    {
                        openingTime.push({dayNumber:0, open:1, openingHour:null, closingHour:null});
                    }
                }

                if(current.j2s==0){
                    openingTime.push({dayNumber:1, open:0});
                }
                else{
                    if(current.j2s1de!="" && current.j2s1a!=""){
                        var s1de=myConvert(current.j2s1de);
                        var s1a=myConvert(current.j2s1a);
                        if( !( isNaN(s1de) || isNaN(s1a) ))
                            openingTime.push({dayNumber:1, open:1, openingHour:s1de, closingHour:s1a});
                        if(current.j2s2de!="" && current.j2s2a!="" ){
                            var s2de=myConvert(current.j2s2de);
                            var s2a=myConvert(current.j2s2a);
                            if( !( isNaN(s2de) || isNaN(s2a) ))
                                openingTime.push({dayNumber:1, open:1, openingHour:s2de, closingHour:s2a});
                        }
                    }
                    else
                    {
                        openingTime.push({dayNumber:1, open:1, openingHour:null, closingHour:null});
                    }
                }

                if(current.j3s==0){
                    openingTime.push({dayNumber:2, open:0});
                }
                else{
                    if(current.j3s1de!="" && current.j3s1a!="" ){
                        var s1de=myConvert(current.j3s1de);
                        var s1a=myConvert(current.j3s1a);
                        if( !( isNaN(s1de) || isNaN(s1a) ))
                            openingTime.push({dayNumber:2, open:1, openingHour:s1de, closingHour:s1a});
                        if(current.j3s2de!="" && current.j3s2a!="" ){
                            var s2de=myConvert(current.j3s2de);
                            var s2a=myConvert(current.j3s2a);
                            if( !( isNaN(s2de) || isNaN(s2a) ))
                                openingTime.push({dayNumber:2, open:1, openingHour:s2de, closingHour:s2a});
                        }
                    }
                    else
                    {
                        openingTime.push({dayNumber:2, open:1, openingHour:null, closingHour:null});
                    }
                }

                if(current.j4s==0){
                    openingTime.push({dayNumber:3, open:0});
                }
                else{
                    if(current.j4s1de!="" && current.j4s1a!="" ){
                        var s1de=myConvert(current.j4s1de);
                        var s1a=myConvert(current.j4s1a);
                        if( !( isNaN(s1de) || isNaN(s1a) ))
                            openingTime.push({dayNumber:3, open:1, openingHour:s1de, closingHour:s1a});
                        if(current.j4s2de!="" && current.j4s2a!="" ){
                            var s2de=myConvert(current.j4s2de);
                            var s2a=myConvert(current.j4s2a);
                            if( !( isNaN(s2de) || isNaN(s2a) ))
                                openingTime.push({dayNumber:3, open:1, openingHour:s2de, closingHour:s2a});
                        }
                    }
                    else
                    {
                        openingTime.push({dayNumber:3, open:1, openingHour:null, closingHour:null});
                    }
                }

                if(current.j5s==0){
                    openingTime.push({dayNumber:4, open:0});
                }
                else{
                    if(current.j5s1de!="" && current.j5s1a!="" ){
                        var s1de=myConvert(current.j5s1de);
                        var s1a=myConvert(current.j5s1a);
                        if( !( isNaN(s1de) || isNaN(s1a) ))
                            openingTime.push({dayNumber:4, open:1, openingHour:s1de, closingHour:s1a});
                        if(current.j5s2de!="" && current.j5s2a!="" ){
                            var s2de=myConvert(current.j5s2de);
                            var s2a=myConvert(current.j5s2a);
                            if( !( isNaN(s2de) || isNaN(s2a) ))
                                openingTime.push({dayNumber:4, open:1, openingHour:s2de, closingHour:s2a});
                        }
                    }
                    else
                    {
                        openingTime.push({dayNumber:4, open:1, openingHour:null, closingHour:null});
                    }
                }

                if(current.j6s==0){
                    openingTime.push({dayNumber:5, open:0});
                }
                else{
                    if(current.j6s1de!="" && current.j6s1a!="" ){
                        var s1de=myConvert(current.j6s1de);
                        var s1a=myConvert(current.j6s1a);
                        if( !( isNaN(s1de) || isNaN(s1a) ))
                            openingTime.push({dayNumber:5, open:1, openingHour:s1de, closingHour:s1a});
                        if(current.j6s2de!="" && current.j6s2a!="" ){
                            var s2de=myConvert(current.j6s2de);
                            var s2a=myConvert(current.j6s2a);
                            if( !( isNaN(s2de) || isNaN(s2a) ))
                                openingTime.push({dayNumber:5, open:1, openingHour:s2de, closingHour:s2a});
                        }
                    }
                    else
                    {
                        openingTime.push({dayNumber:5, open:1, openingHour:null, closingHour:null});
                    }
                }

                if(current.j7s==0){
                    openingTime.push({dayNumber:6, open:0});
                }
                else{
                    if(current.j7s1de!="" && current.j7s1a!="" ){
                        var s1de=myConvert(current.j7s1de);
                        var s1a=myConvert(current.j7s1a);
                        if( !( isNaN(s1de) || isNaN(s1a) ))
                            openingTime.push({dayNumber:6, open:1, openingHour:s1de, closingHour:s1a});
                        if(current.j7s2de!="" && current.j7s2a!="" ){
                            var s2de=myConvert(current.j7s2de);
                            var s2a=myConvert(current.j7s2a);
                            if( !( isNaN(s2de) || isNaN(s2a) ))
                                openingTime.push({dayNumber:6, open:1, openingHour:s2de, closingHour:s2a});
                        }
                    }
                    else
                    {
                        openingTime.push({dayNumber:6, open:1, openingHour:null, closingHour:null});
                    }
                }


                var gId=0;
                var dId=0;
                var tags=[];
                Gouvernera.find({'name':gouv}, function(err, docs){
                            if(docs.length>0){
                                gId=docs[0].id;
                                if(delegationCode!=0)
                                    delegationFn();
                                else
                                    tagFn();
                            }
                            else{
                                 var g = new Gouvernera({name:gouv});
                                 g.save(function(error){
                                    if (error) console.error('Not able to add gouvernera:', error);
                                    else {
                                        gId=g.id; 
                                        if(delegationCode!=0)
                                            delegationFn();
                                        else
                                            tagFn();
                                    }
                                });
                            }
                        });

                function delegationFn(){
                            Delegation.find({'postCode':delegationCode}, function(err, docs){
                                //console.log(docs);
                                if(docs.length>0){
                                    dId=docs[0].id;
                                    tagFn();
                                }
                                else{
                                    var d = new Delegation({postCode:delegationCode});
                                    d.save(function(error){
                                        if (error) console.error('Not able to add delegation :', error);
                                        else {
                                            dId=d.id;
                                            tagFn();
                                        }
                                    });
                                }
                            });
                        };

                function tagFn(){                        
                    Tag.find({'name':category}, function(err, docs3){
                        if(docs3.length>0){
                            tags.push(docs3[0].id);
                            tag2Fn();
                        }
                        else{
                            var t = new Tag({name:category});
                            t.save(function(error){
                               if (error) console.error('Not able to add Tag :', error); 
                                tags.push(t.id);
                                tag2Fn();
                            });
                        }
                    });
                };

                function tag2Fn(){                        
                    Tag.find({'name':sousCategory}, function(err, docs3){
                        if(docs3.length>0){
                            tags.push(docs3[0].id);
                            businessFn();
                        }
                        else{
                            var t = new Tag({name:sousCategory});
                            t.save(function(error){
                               if (error) console.error('Not able to add Tag 2 :', error); 
                                tags.push(t.id);
                                businessFn();
                            });
                        }
                    });
                };

                function businessFn(){
                    //console.log("gId:"+gId+"   dId  "+dId+" profileImage:"+profileImage);
                    if(dId==0)
                        dId=null;
                    var b = new Business({
                        name:name, 
                        description:description,
                        tel:tel,
                        longitude:longitude,
                        latitude:latitude,
                        adress:adress,
                        gouvernera:gId,
                        delegation:dId,
                        tag:tags,
                        serviceADomicile:serviceADomicile,
                        category:category,
                        sousCategory:sousCategory,
                        email:email,
                        site:site,
                        facebook:facebook,
                        googleplus:googleplus,
                        openingTime:openingTime,
                        profileImage:profileImage,
                        urlScrape:urlScrape

                    });
                    tags=[];
                    openingTime=[];
                    b.save(function(error){
                        if (error) console.error('Not able to add business:', error);
                        else{
                            //console.log("Business Aded");
                        }
                    });



                    i++;
                    if(i<body.length){
                        step();
                    }
                    else
                        go();
                    //   response2.json(body);  

                };

            };
        });
        
        }
        };
    
    
    return;

};
function scrapeService(request2, response2) {
    //max:874
    var debut=1;
    var fin=5;
    
    go();
    
    function go(){
        debut++;
        if(debut>fin){
            response2.json("finish");
            return;
        }
        else
        {
        request.post({
          headers: {'content-type' : 'multipart/form-data; boundary=----WebKitFormBoundaryUo8aX5tAuE19CcSX'},
          url:     'http://www.bonnes-adresses.tn/adresses-sante-a-tunisie.html?enticache=0.44762341329109634&api=pagination',
          body:'------WebKitFormBoundaryUo8aX5tAuE19CcSX\nContent-Disposition: form-data; name="jsonDataApiTransfert\n\n{"page":'+debut+',"filter":{"categorie":"222","ville":"Tunisie"}}\n------WebKitFormBoundaryUo8aX5tAuE19CcSX--'
        }, function(error, response, body)
         {
            body=JSON.parse(body);
            body=body.master_data.data;
            var i=0;
            step();
            function step(){
                var current=body[i];

                var name=current.titre;
                var adress=current.adresse;
                var description=current.description;
                var tel=current.tel;
                var email=current.email;
                var site=current.site;
                var facebook=current.facebook;
                var googleplus=current.googleplus;
                var longitude=current.marker[0];
                if(longitude!=0)
                    var latitude=current.marker[1];
                else
                    var latitude=0;

                var sousCategory=current.categorie;
                var category='Service';

                if(current.service_a_domicile==0)
                    var serviceADomicile=false;
                else
                    var serviceADomicile=true;
                var gouv=current.ville;
                var urlScrape=current.url;
                var delegationCode=current.cp;
                var profileImage=current.photo;
                if(profileImage.indexOf('no_photo')!=-1 || profileImage.indexOf('gravatar')!=-1){
                    profileImage='default.png';
                }
                else{
                    var uri = Math.round(+new Date()/1000);  
                    profileImage=uri+'.jpg';
                    request(current.photo, {encoding: 'binary'}, function(error, response, bodyImg) {
                      fs.writeFile('public/img/bimg/'+profileImage, bodyImg, 'binary', function (err) {});
                    });
                }
                var openingTime=[];
                if(current.j1s==0){
                    openingTime.push({dayNumber:0, open:0});
                }
                else{
                    if(current.j1s1de!="" && current.j1s1a!=""){
                        var s1de=myConvert(current.j1s1de);
                        var s1a=myConvert(current.j1s1a);
                        if( !( isNaN(s1de) || isNaN(s1a) ))
                            openingTime.push({dayNumber:0, open:1, openingHour:s1de, closingHour:s1a});
                        if(current.j1s2de!="" && current.j1s2a!=""){
                            var s2de=myConvert(current.j1s2de);
                            var s2a=myConvert(current.j1s2a);
                            if( !( isNaN(s2de) || isNaN(s2a) ))
                                openingTime.push({dayNumber:0, open:1, openingHour:s2de, closingHour:s2a});
                    }
                    }
                    else
                    {
                        openingTime.push({dayNumber:0, open:1, openingHour:null, closingHour:null});
                    }
                }

                if(current.j2s==0){
                    openingTime.push({dayNumber:1, open:0});
                }
                else{
                    if(current.j2s1de!="" && current.j2s1a!=""){
                        var s1de=myConvert(current.j2s1de);
                        var s1a=myConvert(current.j2s1a);
                        if( !( isNaN(s1de) || isNaN(s1a) ))
                            openingTime.push({dayNumber:1, open:1, openingHour:s1de, closingHour:s1a});
                        if(current.j2s2de!="" && current.j2s2a!="" ){
                            var s2de=myConvert(current.j2s2de);
                            var s2a=myConvert(current.j2s2a);
                            if( !( isNaN(s2de) || isNaN(s2a) ))
                                openingTime.push({dayNumber:1, open:1, openingHour:s2de, closingHour:s2a});
                        }
                    }
                    else
                    {
                        openingTime.push({dayNumber:1, open:1, openingHour:null, closingHour:null});
                    }
                }

                if(current.j3s==0){
                    openingTime.push({dayNumber:2, open:0});
                }
                else{
                    if(current.j3s1de!="" && current.j3s1a!="" ){
                        var s1de=myConvert(current.j3s1de);
                        var s1a=myConvert(current.j3s1a);
                        if( !( isNaN(s1de) || isNaN(s1a) ))
                            openingTime.push({dayNumber:2, open:1, openingHour:s1de, closingHour:s1a});
                        if(current.j3s2de!="" && current.j3s2a!="" ){
                            var s2de=myConvert(current.j3s2de);
                            var s2a=myConvert(current.j3s2a);
                            if( !( isNaN(s2de) || isNaN(s2a) ))
                                openingTime.push({dayNumber:2, open:1, openingHour:s2de, closingHour:s2a});
                        }
                    }
                    else
                    {
                        openingTime.push({dayNumber:2, open:1, openingHour:null, closingHour:null});
                    }
                }

                if(current.j4s==0){
                    openingTime.push({dayNumber:3, open:0});
                }
                else{
                    if(current.j4s1de!="" && current.j4s1a!="" ){
                        var s1de=myConvert(current.j4s1de);
                        var s1a=myConvert(current.j4s1a);
                        if( !( isNaN(s1de) || isNaN(s1a) ))
                            openingTime.push({dayNumber:3, open:1, openingHour:s1de, closingHour:s1a});
                        if(current.j4s2de!="" && current.j4s2a!="" ){
                            var s2de=myConvert(current.j4s2de);
                            var s2a=myConvert(current.j4s2a);
                            if( !( isNaN(s2de) || isNaN(s2a) ))
                                openingTime.push({dayNumber:3, open:1, openingHour:s2de, closingHour:s2a});
                        }
                    }
                    else
                    {
                        openingTime.push({dayNumber:3, open:1, openingHour:null, closingHour:null});
                    }
                }

                if(current.j5s==0){
                    openingTime.push({dayNumber:4, open:0});
                }
                else{
                    if(current.j5s1de!="" && current.j5s1a!="" ){
                        var s1de=myConvert(current.j5s1de);
                        var s1a=myConvert(current.j5s1a);
                        if( !( isNaN(s1de) || isNaN(s1a) ))
                            openingTime.push({dayNumber:4, open:1, openingHour:s1de, closingHour:s1a});
                        if(current.j5s2de!="" && current.j5s2a!="" ){
                            var s2de=myConvert(current.j5s2de);
                            var s2a=myConvert(current.j5s2a);
                            if( !( isNaN(s2de) || isNaN(s2a) ))
                                openingTime.push({dayNumber:4, open:1, openingHour:s2de, closingHour:s2a});
                        }
                    }
                    else
                    {
                        openingTime.push({dayNumber:4, open:1, openingHour:null, closingHour:null});
                    }
                }

                if(current.j6s==0){
                    openingTime.push({dayNumber:5, open:0});
                }
                else{
                    if(current.j6s1de!="" && current.j6s1a!="" ){
                        var s1de=myConvert(current.j6s1de);
                        var s1a=myConvert(current.j6s1a);
                        if( !( isNaN(s1de) || isNaN(s1a) ))
                            openingTime.push({dayNumber:5, open:1, openingHour:s1de, closingHour:s1a});
                        if(current.j6s2de!="" && current.j6s2a!="" ){
                            var s2de=myConvert(current.j6s2de);
                            var s2a=myConvert(current.j6s2a);
                            if( !( isNaN(s2de) || isNaN(s2a) ))
                                openingTime.push({dayNumber:5, open:1, openingHour:s2de, closingHour:s2a});
                        }
                    }
                    else
                    {
                        openingTime.push({dayNumber:5, open:1, openingHour:null, closingHour:null});
                    }
                }

                if(current.j7s==0){
                    openingTime.push({dayNumber:6, open:0});
                }
                else{
                    if(current.j7s1de!="" && current.j7s1a!="" ){
                        var s1de=myConvert(current.j7s1de);
                        var s1a=myConvert(current.j7s1a);
                        if( !( isNaN(s1de) || isNaN(s1a) ))
                            openingTime.push({dayNumber:6, open:1, openingHour:s1de, closingHour:s1a});
                        if(current.j7s2de!="" && current.j7s2a!="" ){
                            var s2de=myConvert(current.j7s2de);
                            var s2a=myConvert(current.j7s2a);
                            if( !( isNaN(s2de) || isNaN(s2a) ))
                                openingTime.push({dayNumber:6, open:1, openingHour:s2de, closingHour:s2a});
                        }
                    }
                    else
                    {
                        openingTime.push({dayNumber:6, open:1, openingHour:null, closingHour:null});
                    }
                }


                var gId=0;
                var dId=0;
                var tags=[];
                Gouvernera.find({'name':gouv}, function(err, docs){
                            if(docs.length>0){
                                gId=docs[0].id;
                                if(delegationCode!=0)
                                    delegationFn();
                                else
                                    tagFn();
                            }
                            else{
                                 var g = new Gouvernera({name:gouv});
                                 g.save(function(error){
                                    if (error) console.error('Not able to add gouvernera:', error);
                                    else {
                                        gId=g.id; 
                                        if(delegationCode!=0)
                                            delegationFn();
                                        else
                                            tagFn();
                                    }
                                });
                            }
                        });

                function delegationFn(){
                            Delegation.find({'postCode':delegationCode}, function(err, docs){
                                //console.log(docs);
                                if(docs.length>0){
                                    dId=docs[0].id;
                                    tagFn();
                                }
                                else{
                                    var d = new Delegation({postCode:delegationCode});
                                    d.save(function(error){
                                        if (error) console.error('Not able to add delegation :', error);
                                        else {
                                            dId=d.id;
                                            tagFn();
                                        }
                                    });
                                }
                            });
                        };

                function tagFn(){                        
                    Tag.find({'name':category}, function(err, docs3){
                        if(docs3.length>0){
                            tags.push(docs3[0].id);
                            tag2Fn();
                        }
                        else{
                            var t = new Tag({name:category});
                            t.save(function(error){
                               if (error) console.error('Not able to add Tag :', error); 
                                tags.push(t.id);
                                tag2Fn();
                            });
                        }
                    });
                };

                function tag2Fn(){                        
                    Tag.find({'name':sousCategory}, function(err, docs3){
                        if(docs3.length>0){
                            tags.push(docs3[0].id);
                            businessFn();
                        }
                        else{
                            var t = new Tag({name:sousCategory});
                            t.save(function(error){
                               if (error) console.error('Not able to add Tag 2 :', error); 
                                tags.push(t.id);
                                businessFn();
                            });
                        }
                    });
                };

                function businessFn(){
                    //console.log("gId:"+gId+"   dId  "+dId+" profileImage:"+profileImage);
                    if(dId==0)
                        dId=null;
                    var b = new Business({
                        name:name, 
                        description:description,
                        tel:tel,
                        longitude:longitude,
                        latitude:latitude,
                        adress:adress,
                        gouvernera:gId,
                        delegation:dId,
                        tag:tags,
                        serviceADomicile:serviceADomicile,
                        category:category,
                        sousCategory:sousCategory,
                        email:email,
                        site:site,
                        facebook:facebook,
                        googleplus:googleplus,
                        openingTime:openingTime,
                        profileImage:profileImage,
                        urlScrape:urlScrape

                    });
                    tags=[];
                    openingTime=[];
                    b.save(function(error){
                        if (error) console.error('Not able to add business:', error);
                        else{
                            //console.log("Business Aded");
                        }
                    });



                    i++;
                    if(i<body.length){
                        step();
                    }
                    else
                        go();
                    //   response2.json(body);  

                };

            };
        });
        
        }
        };
    
    
    return;

};




function getAllAlimentation(request, response){
    Business.find({
            'category': 'Alimentation'
            //'category': { $in: ['Pharmacie','Medecin']}
        },'_id sousCategory name tel created_at rate gouvernera delegation'
        ,function(error, business) {
        if (error) console.error('Could not retrieve business b/c:', error);
        response.json(business);
      }).populate("delegation").populate("gouvernera"); 
};
function getAllAnimaux(request, response){
    Business.find({
            'category': 'Animaux'
        },'_id sousCategory name tel created_at rate gouvernera delegation'
        ,function(error, business) {
        if (error) console.error('Could not retrieve business b/c:', error);
        response.json(business);
      }).populate("delegation").populate("gouvernera"); 
};
function getAllAutoMoto(request, response){
    Business.find({
            'category': 'Auto-Motos'
        },'_id sousCategory name tel created_at rate gouvernera delegation'
        ,function(error, business) {
        if (error) console.error('Could not retrieve business b/c:', error);
        response.json(business);
      }).populate("delegation").populate("gouvernera"); 
};
function getAllArtisans(request, response){
    Business.find({
            'category': 'Artisans'
        },'_id sousCategory name tel created_at rate gouvernera delegation'
        ,function(error, business) {
        if (error) console.error('Could not retrieve business b/c:', error);
        response.json(business);
      }).populate("delegation").populate("gouvernera"); 
};
function getAllSport(request, response){
    Business.find({
            'category': 'Sport'
        },'_id sousCategory name tel created_at rate gouvernera delegation'
        ,function(error, business) {
        if (error) console.error('Could not retrieve business b/c:', error);
        response.json(business);
      }).populate("delegation").populate("gouvernera"); 
};
function getAllBeaute(request, response){
    Business.find({
            'category': 'Beauté et bien être'
        },'_id sousCategory name tel created_at rate gouvernera delegation'
        ,function(error, business) {
        if (error) console.error('Could not retrieve business b/c:', error);
        response.json(business);
      }).populate("delegation").populate("gouvernera"); 
};
function getAllVoyageLoisirs(request, response){
    Business.find({
            'category': 'voyages et loisirs'
        },'_id sousCategory name tel created_at rate gouvernera delegation'
        ,function(error, business) {
        if (error) console.error('Could not retrieve business b/c:', error);
        response.json(business);
      }).populate("delegation").populate("gouvernera"); 
};
function getAllHighTech(request, response){
    Business.find({
            'category': 'High Tech'
        },'_id sousCategory name tel created_at rate gouvernera delegation'
        ,function(error, business) {
        if (error) console.error('Could not retrieve business b/c:', error);
        response.json(business);
      }).populate("delegation").populate("gouvernera"); 
};
function getAllEnfantEducation(request, response){
    Business.find({
            'category': 'Enfant et Education'
        },'_id sousCategory name tel created_at rate gouvernera delegation'
        ,function(error, business) {
        if (error) console.error('Could not retrieve business b/c:', error);
        response.json(business);
      }).populate("delegation").populate("gouvernera"); 
};
function getAllModeHabillement(request, response){
    Business.find({
            'category': 'Mode et Habillement'
        },'_id sousCategory name tel created_at rate gouvernera delegation'
        ,function(error, business) {
        if (error) console.error('Could not retrieve business b/c:', error);
        response.json(business);
      }).populate("delegation").populate("gouvernera"); 
};
function getAllFournitureAdministratif(request, response){
    Business.find({
            'category': 'Fournitures Administratifs'
        },'_id sousCategory name tel created_at rate gouvernera delegation'
        ,function(error, business) {
        if (error) console.error('Could not retrieve business b/c:', error);
        response.json(business);
      }).populate("delegation").populate("gouvernera"); 
};
function getAllMaisonDeco(request, response){
    Business.find({
            'category': 'Maison et Deco'
        },'_id sousCategory name tel created_at rate gouvernera delegation'
        ,function(error, business) {
        if (error) console.error('Could not retrieve business b/c:', error);
        response.json(business);
      }).populate("delegation").populate("gouvernera"); 
};
function getAllSortie(request, response){
    Business.find({
            'category': 'Sortie'
        },'_id sousCategory name tel created_at rate gouvernera delegation'
        ,function(error, business) {
        if (error) console.error('Could not retrieve business b/c:', error);
        response.json(business);
      }).populate("delegation").populate("gouvernera"); 
};
function getAllService(request, response){
    Business.find({
            'category': 'Service'
        },'_id sousCategory name tel created_at rate gouvernera delegation'
        ,function(error, business) {
        if (error) console.error('Could not retrieve business b/c:', error);
        response.json(business);
      }).populate("delegation").populate("gouvernera"); 
};

function myConvert(d){
    if(typeof(d)!='undefined'){
        var h=parseInt(d.split('h')[0]);
        var m=parseInt(d.split('h')[1]);
        return h*2+(m/30);
    }
    else
        return NaN;
    
};






module.exports = {
    scrapeAlimentation: scrapeAlimentation,
    getAllAlimentation:getAllAlimentation,
    getAllAnimaux:getAllAnimaux,
    scrapeAnimaux:scrapeAnimaux,
    getAllAutoMoto:getAllAutoMoto,
    scrapeAutoMoto:scrapeAutoMoto,
    getAllArtisans:getAllArtisans,
    scrapeArtisans:scrapeArtisans,
    getAllSport:getAllSport,
    scrapeSport:scrapeSport,
    scrapeBeaute:scrapeBeaute,
    getAllBeaute:getAllBeaute,
    scrapeVoyageLoisirs:scrapeVoyageLoisirs,
    getAllVoyageLoisirs:getAllVoyageLoisirs,
    scrapeHighTech:scrapeHighTech,
    getAllHighTech:getAllHighTech,
    scrapeEnfantEducation:scrapeEnfantEducation,
    getAllEnfantEducation:getAllEnfantEducation,
    scrapeModeHabillement:scrapeModeHabillement,
    getAllModeHabillement:getAllModeHabillement,
    scrapeFournitureAdministratif:scrapeFournitureAdministratif,
    getAllFournitureAdministratif:getAllFournitureAdministratif,
    scrapeMaisonDeco:scrapeMaisonDeco,
    getAllMaisonDeco:getAllMaisonDeco,
    scrapeSortie:scrapeSortie,
    getAllSortie:getAllSortie,
    scrapeService:scrapeService,
    getAllService:getAllService
    

    
    
};