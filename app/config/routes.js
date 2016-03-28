var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var mongoose = require('mongoose');
var Schema = mongoose.Schema; 


var fs = require('fs');

var apiRouter = express.Router();
var articlesController = require('../controllers/articles-controller'); 
var santeController = require('../controllers/sante-controller'); 
var LoginCredentialController = require('../controllers/login-controller'); 
var TagController = require('../controllers/tag-controller'); 
var GouverneraController = require('../controllers/gouvernera-controller');

var BusinessController = require('../controllers/businessSearch-controller');

var RestaurantController = require('../controllers/restaurant-controller');

var PassportController = require('../controllers/passport-controller');

var ScrapeController = require('../controllers/scrape-controller');

//var User=require('../models/User');

//apiRouter.param('article_id', articlesController.articleById);
/*
// configure router middleware
apiRouter.route('/articles')

  .post(articlesController.create)

  .get(articlesController.index);

apiRouter.route('/articles/:article_id')

  .get(articlesController.show)

  .patch(articlesController.update)

  .delete(articlesController.destroy);

*/

apiRouter.route('/sante/scrape').get(santeController.scrape);
apiRouter.route('/sante/scrape2').get(santeController.scrape2);
apiRouter.get('/sante/', santeController.getAll);

apiRouter.route('/admin')
  .post(LoginCredentialController.createAdmin);
apiRouter.route('/user')
  .post(PassportController.createUser);

apiRouter.route('/admin/auth')
  .post(LoginCredentialController.authetificationAdmin);
apiRouter.route('/user/auth')
  .post(PassportController.authetificationUser);


apiRouter.route('/tag')
    .get(TagController.getAll);
apiRouter.get('/tag/search', TagController.search);
apiRouter.get('/tag/:id', TagController.show);
apiRouter.post('/tag/add', TagController.add);
apiRouter.post('/tag/edit', TagController.edit);
apiRouter.get('/tag/remove/:_id', TagController.remove);

apiRouter.get('/address/search', GouverneraController.searchGouverneraAndDelegation);

apiRouter.post('/business/search', BusinessController.search);


apiRouter.get('/restaurant/list', RestaurantController.getAll);


apiRouter.get('/alimentation/list', ScrapeController.getAllAlimentation);
apiRouter.get('/animaux/list', ScrapeController.getAllAnimaux);
apiRouter.get('/automotos/list', ScrapeController.getAllAutoMoto);
apiRouter.get('/artisans/list', ScrapeController.getAllArtisans);
apiRouter.get('/sport/list', ScrapeController.getAllSport);
apiRouter.get('/beaute/list', ScrapeController.getAllBeaute);
apiRouter.get('/voyageLoisirs/list', ScrapeController.getAllVoyageLoisirs);
apiRouter.get('/highTech/list', ScrapeController.getAllHighTech);
apiRouter.get('/enfantEducation/list', ScrapeController.getAllEnfantEducation);
apiRouter.get('/modeHabillement/list', ScrapeController.getAllModeHabillement);
apiRouter.get('/fournitureAdministratif/list', ScrapeController.getAllFournitureAdministratif);
apiRouter.get('/maisonDeco/list', ScrapeController.getAllMaisonDeco);
apiRouter.get('/sortie/list', ScrapeController.getAllSortie);
apiRouter.get('/service/list', ScrapeController.getAllService);

apiRouter.get('/scrape/alimentation', ScrapeController.scrapeAlimentation);
apiRouter.get('/scrape/animaux', ScrapeController.scrapeAnimaux);
apiRouter.get('/scrape/automotos', ScrapeController.scrapeAutoMoto);
apiRouter.get('/scrape/artisans', ScrapeController.scrapeArtisans);
apiRouter.get('/scrape/sport', ScrapeController.scrapeSport);
apiRouter.get('/scrape/beaute', ScrapeController.scrapeBeaute);
apiRouter.get('/scrape/highTech', ScrapeController.scrapeHighTech);
apiRouter.get('/scrape/enfantEducation', ScrapeController.scrapeEnfantEducation);
apiRouter.get('/scrape/modeHabillement', ScrapeController.scrapeModeHabillement);
apiRouter.get('/scrape/fournitureAdministratif', ScrapeController.scrapeFournitureAdministratif);
apiRouter.get('/scrape/maisonDeco', ScrapeController.scrapeMaisonDeco);
apiRouter.get('/scrape/sortie', ScrapeController.scrapeSortie);
apiRouter.get('/scrape/service', ScrapeController.scrapeService);



//  .patch(TagController.update)
//  .delete(TagController.destroy);


module.exports = apiRouter;