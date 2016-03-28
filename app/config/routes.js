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

apiRouter.get('/address/search', GouverneraController.searchGouverneraAndDelegation);

apiRouter.post('/business/search', BusinessController.search);


apiRouter.get('/restaurant/list', RestaurantController.getAll);


//  .patch(TagController.update)
//  .delete(TagController.destroy);


module.exports = apiRouter;