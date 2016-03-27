var mongoose = require('mongoose');
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var Business = require('../models/Business');
var Delegation = require('../models/Delegation');
var Gouvernera = require('../models/Gouvernera');
var Tag = require('../models/Tag');
var Schema = mongoose.Schema; // allows us to create a constructor for our model

function scrape(request2, response2) {
    /*var initial=600;
    var i=600;
    var max=700;*/
    var initial=1;
    var i=1;
    var max=50;
	var base = 'http://monguide-medical.com/detail-medical.php?id_medic=';
	var typeEtNom, specialite, adresse, adresse2, tel, dateCreation;
	var json = { typeEtNom : "", specialite : "", adresse : "", adresse2:"", tel:"", dateCreation:""};
	var table=[];
	function recu(i){
		if(i>max){
            return;   
        }
        else{
		url = base+i;

		request(url, function(error, response, html){
			if(!error){
				var $ = cheerio.load(html);
                json = { typeEtNom : "", specialite : "", adresse : "", adresse2:"", tel:"", dateCreation:""};
				json.typeEtNom=$('td.ss_titre').first().text();
				var cmp=1;
				$('td.ss_titre').each(function(i, element){
					var a = $(this);
					var x=a.next().text().trim();
					if(x.length>2){
						if(cmp==2){
							json.specialite=x;
						}
						else if(cmp==4){
							json.adresse=x;
						}
						else if(cmp==5){
							json.adresse2=x;
						}
						else if(cmp==8){
							json.tel=x;
						}
						else if(cmp==12){
							json.dateCreation=x;
						}
					}
					cmp++;
				});
                if(json.typeEtNom.length>2){
                    var name=json.typeEtNom.split('-')[1].trim();
                    var gouv = json.adresse.split('-')[0].trim();
                    var delegation = json.adresse.split('-')[1].trim();
                    var gId=0; var dId=0;
                    var tags=[];
                    Gouvernera.find({'name':gouv}, function(err, docs){
                        if(docs.length>0){
                            gId=docs[0].id;
                            delegationFn();
                        }
                        else{
                             var g = new Gouvernera({name:gouv});
                             g.save(function(error){
                                if (error) console.error('Not able to add gouvernera:', error);
                                else {
                                    gId=g.id; 
                                    delegationFn();
                                }
                            });
                        }
                    });
                    function delegationFn(){
                        Delegation.find({'name':delegation}, function(err, docs){
                            if(docs.length>0){
                                dId=docs[0].id;
                                tagFn();
                            }
                            else{
                                var d = new Delegation({name:delegation});
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
                        var cat='';

                        if(json.typeEtNom[0]=='M')  cat='Medecin';
                        else if(json.typeEtNom[0]=='P' && json.typeEtNom[1]=='h') cat='Pharmacie';
                        else if(json.typeEtNom[0]=='D') cat='Dentiste';
                        else if(json.typeEtNom[0]=='I') cat='Infirmerie';
                        else if(json.typeEtNom[0]=='C' && json.typeEtNom[1]=='l') cat='Clinique';
                        else if(json.typeEtNom[0]=='H') cat='Hopital';
                        else if(json.typeEtNom[0]=='L') cat='Laboratoire';
                        else if(json.typeEtNom[0]=='O') cat='Opticien';
                        else if(json.typeEtNom[0]=='P' && json.typeEtNom[1]=='a') cat='Paramedicaux';
                        else if(json.typeEtNom[0]=='P' && json.typeEtNom[1]=='e') cat='Centre';
                        else if(json.typeEtNom[0]=='T') cat='Therapie';
                        else if(json.typeEtNom[0]=='V') cat='Veterinaire';
                        else if(json.typeEtNom[0]=='A') cat='Ambulance';
                        else if(json.typeEtNom[0]=='G') cat='Grossiste';
                        else if(json.typeEtNom[0]=='A' && json.typeEtNom[1]=='s') cat='Association';
                        else if(json.typeEtNom[0]=='U') cat='Urgence';
                        else if(json.typeEtNom[0]=='S') cat='Service Medical Domicile';
                        
                        Tag.find({'name':cat}, function(err, docs3){
                            if(docs3.length>0){
                                tags.push(docs3[0].id);
                                Tag2Fn();
                            }
                            else{
                                    var t = new Tag({name:cat});
                                    t.save(function(error){
                                       if (error) console.error('Not able to add Tag :', error); 
                                        tags.push(t.id);
                                        Tag2Fn();
                                    });

                            }
                        });
                    };
                    function Tag2Fn(){
                        
                        Tag.find({'name':json.typeEtNom.split('-')[0].trim()}, function(err, docs2){
                            if(docs2.length>0){
                                tags.push(docs2[0].id);
                                if(json.typeEtNom[0]=='M'){
                                    Tag.find({'name':'Medecin, '+json.specialite}, function(err, docs2){
                                    if(docs2.length>0){
                                        tags.push(docs2[0].id);
                                        businessFn();
                                    }
                                    else{
                                        var t = new Tag({name:'Medecin, '+json.specialite});
                                        t.save(function(error){
                                           if (error) console.error('Not able to add Tag :', error); 
                                            tags.push(t.id);
                                            businessFn();
                                        });

                                    }
                                });   
                                }
                                else
                                    businessFn();
                            }
                            else{
                                var t = new Tag({name:json.typeEtNom.split('-')[0].trim()});
                                t.save(function(error){
                                   if (error) console.error('Not able to add Tag :', error); 
                                    tags.push(t.id);
                                    if(json.typeEtNom[0]=='M'){
                                        Tag.find({'name':'Medecin, '+json.specialite.trim()}, function(err, docs2){
                                            if(docs2.length>0){
                                                tags.push(docs2[0].id);
                                                businessFn();
                                            }
                                            else{
                                                var t = new Tag({name:'Medecin, '+json.specialite.trim()});
                                                t.save(function(error){
                                                   if (error) console.error('Not able to add Tag :', error); 
                                                    tags.push(t.id);
                                                    businessFn();
                                                });

                                            }
                                        });
                                    }
                                    else
                                        businessFn();
                                });

                            }
                        });
                        };
                    function businessFn(){

                        var b = new Business({
                            name:name, 
                            description:name+', '+typeEtNom+', '+json.specialite.trim(),
                            tel:json.tel,
                            dateCreation:json.dateCreation,
                            rate:0,
                            longitude:0,
                            latitude:0,
                            adress:json.adresse2,
                            gouvernera:gId,
                            delegation:dId,
                            tag:tags
                        });
                        tags=[];
                        b.save(function(error){
                            if (error) console.error('Not able to add business:', error);
                            else{
                                //console.log("Business Aded");
                            }
                        });
                    };
                    
                }

				var prog=(i-initial+1)*100/max;
                //response2.json({'progress':prog});
				console.log((i-initial+1)*1000/max+" %");
				i=i+1;
				if(i<max)
					recu(i);
				else{
                    console.log("finish");
                    response2.json({'progress':'100'});
					return;
				}
				
				}
        
		});
		}
		
	}
	
	recu(i);
	
    

};


function scrape2(request2, response2) {
    //max:874
    var debut=840;
    var fin=874;
    
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
          body:'------WebKitFormBoundaryUo8aX5tAuE19CcSX\nContent-Disposition: form-data; name="jsonDataApiTransfert\n\n{"page":'+debut+',"filter":{"categorie":"9","ville":"Tunisie"}}\n------WebKitFormBoundaryUo8aX5tAuE19CcSX--'
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
                if(sousCategory[0]=='P' && sousCategory[1]=='h')
                    var category='Pharmacie';
                else
                    var category='Medecin';
                if(current.service_a_domicile==0)
                    var serviceADomicile=false;
                else
                    var serviceADomicile=true;
                var gouv=current.ville;
                var urlScrape=current.url;
                var delegationCode=current.cp;
                var profileImage=current.photo;
                if(profileImage.indexOf('no_photo')!=-1 || profileImage.indexOf('gravatar')!=-1){
                    if(category[0]=='P')
                        profileImage='pharmacie.png';
                    else
                        profileImage='medecin.png';
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
                //console.log(current);




        });
        
        }
        };
    
    
    return;

};


function myConvert(d){
    var h=parseInt(d.split('h')[0]);
    var m=parseInt(d.split('h')[1]);
    return h*2+(m/30);
    
};


function getAll(request, response){
    Business.find({
            'category': { $in: ['Pharmacie','Medecin']}
            //'category': { $in: ['Pharmacie','Medecin']}
        },'_id sousCategory name tel created_at rate gouvernera delegation'
        ,function(error, business) {
        if (error) console.error('Could not retrieve business b/c:', error);
        response.json(business);
      }).populate("delegation").populate("gouvernera"); 
};



function getAllWithTag(request, response){
    Tag.find({
            'name': { $in: [
            'Medecin', 'Veterinaire', 'Ambulance', 'Grossiste', 'Association', 'Urgence',
            'Pharmacie', 'Opticien' , 'Paramedicaux', 'Centre', 'Therapie', 'Service Medical Domicile',
            'Dentiste', 'Infirmerie', 'Clinique', 'Hopital', 'Laboratoire' 
            ]}}
            ,'_id',function(error, tags) {
            if (error) console.error('Could not retrieve business b/c:', error);
            tags = tags.map(function(doc) { return doc._id; });
            Business.find({
                            'tag': { $in: tags}
                }
                ,function(error, business) {
                if (error) console.error('Could not retrieve business b/c:', error);
                response.json(business);
              }).populate("delegation").populate("gouvernera"); 
            
//            response.json(business);
            
        });
/*    Business.find({'tag':},function(error, business) {
    if (error) console.error('Could not retrieve business b/c:', error);
    response.json(business);
  });  */
};


module.exports = {
    scrape: scrape,
    scrape2: scrape2,
    getAll:getAll,
    getAllWithTag:getAllWithTag
};