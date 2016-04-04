var express = require('express');

var fs      = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var parseString = require('xml2js').parseString;
var router = express.Router();
var models = require('../models');
var hotel = require('../models/hotel');

var app     = express();







/* GET lister tous les hotel */
router.get('/', function(req, res, next) {


    models.hotel.find({}).sort({'_id': -1}).exec(function(err, list){
        if(err) res.send('Erreur!');
       //res.render('list.twig', { title: 'Hotel List', list: list });
       res.json(list);
    });

});


/* GET Récupérer une catégorie */
router.get('/:id', function(req, res){

    
    hotel.findById(req.params.id).exec(function(err, p){
        if(err) res.json({error: err});
        res.json(p);
    });
});


/* POST Creer un hotel */
router.post('/', function(req, res){

    
    var p = new hotel(req.body);
    p.save(function(err, post){
        if(err) res.json({error: err});
        res.json(post);
    });
});



/* PUT Modifier un hotel */
router.put('/:id', function(req, res){

    
    var data = req.body;
    //if(data.tags == undefined) data.tags = [];
    hotel.findByIdAndUpdate(req.params.id, data, {new: true}, function(err, data){
        if(err) res.json({error: err});
        res.json(data);
    });
});



/* DELETE Supprimer un hotel */
router.delete('/:id', function(req, res){


    
    hotel.findByIdAndRemove(req.params.id, function(err){
        if(err) res.json({error: err});
        res.json({done: "hotel deleted with succes"});
    });
});





  

module.exports = router;
