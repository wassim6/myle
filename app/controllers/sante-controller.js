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

function getAll(request, response){
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
    getAll:getAll
};