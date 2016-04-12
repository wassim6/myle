var express = require('express');

var fs      = require('fs');
var request = require('request');
var router = express.Router();
var challenge = require('../models/challenge');

var app     = express();







/* GET lister tous les hotel */
router.get('/', function(req, res, next) {


    challenge.find({}).sort({'_id': -1}).exec(function(err, list){
        if(err) res.send('Erreur!');
       //res.render('list.twig', { title: 'Hotel List', list: list });
       res.json(list);
    });

});


/* GET Récupérer une catégorie */
router.get('/:id', function(req, res){ 
    challenge.findById(req.params.id).exec(function(err, p){
        if(err) res.json({error: err});
        res.json(p);
    });
});


/* POST Creer un hotel */
router.post('/', function(req, res){   
    var p = new challenge(req.body);
    p.save(function(err, post){
        if(err) res.json({error: err});
        res.json(post);
    });
});



/* PUT Modifier un hotel */
router.put('/:id', function(req, res){   
    var data = req.body;
    //if(data.tags == undefined) data.tags = [];
    challenge.findByIdAndUpdate(req.params.id, data, {new: true}, function(err, data){
        if(err) res.json({error: err});
        res.json(data);
    });
});



/* DELETE Supprimer un hotel */
router.delete('/:id', function(req, res){


    
    challenge.findByIdAndRemove(req.params.id, function(err){
        if(err) res.json({error: err});
        res.json({done: "challenge deleted with succes"});
    });
});





  

module.exports = router;
