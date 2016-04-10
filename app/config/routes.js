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
var BusinessSearchController = require('../controllers/businessSearch-controller');
var BusinessController = require('../controllers/business-controller');
var CouponController = require('../controllers/coupon-controller');
var CommentaireController = require('../controllers/commentaire-controller');

var PassportController = require('../controllers/passport-controller');

var ScrapeController = require('../controllers/scrape-controller');


var HotelController = require('../controllers/hotel-controller');
var ChallengeController = require('../controllers/challenge-controller');


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

apiRouter.use('/hotel', require('../controllers/hotel-controller'));
apiRouter.use('/challenge', require('../controllers/challenge-controller'));

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




apiRouter.get('/user/show/:id', PassportController.showInfo);
apiRouter.get('/user/getbyusername/:username', PassportController.getUserByUsername);
apiRouter.post('/user/edit', PassportController.editInfo);

apiRouter.route('/tag').get(TagController.getAll);
apiRouter.get('/tag/search', TagController.search);
apiRouter.get('/tag/:id', TagController.show);
apiRouter.post('/tag/add', TagController.add);
apiRouter.post('/tag/edit', TagController.edit);
apiRouter.get('/tag/remove/:_id', TagController.remove);

apiRouter.get('/address/search', GouverneraController.searchGouverneraAndDelegation);
apiRouter.get('/address/gouvernera/list', GouverneraController.getAllGouvernera);
apiRouter.get('/address/delegation/list', GouverneraController.getAllDelegation);
apiRouter.get('/address/delegationname/list', GouverneraController.getAllDelegationSansCodePostal);

apiRouter.post('/business/search', BusinessSearchController.search);


apiRouter.get('/business/:id', BusinessController.findById);
apiRouter.post('/business/add', BusinessController.add);
apiRouter.post('/business/editbasic/:id', BusinessController.editBasicInfo);
apiRouter.post('/business/editadress/:id', BusinessController.editAdress);
apiRouter.post('/business/addtag/:id', BusinessController.addTagToBusiness);
apiRouter.post('/business/removetag/:id', BusinessController.removeTagToBusiness);
apiRouter.get('/business/remove/:id', BusinessController.remove);
apiRouter.post('/business/editprofileimage/:id', BusinessController.editProfileImage);
apiRouter.post('/business/editcoverimage/:id', BusinessController.editCoverImage);
apiRouter.post('/business/addImage/:id', BusinessController.addImage);
apiRouter.post('/business/removeImage/:id', BusinessController.removeImage);
apiRouter.post('/business/editInfoview1/:id', BusinessController.editInfoView1);
apiRouter.post('/business/editInfoview2/:id', BusinessController.editInfoView2);
apiRouter.post('/business/editInfoView3/:id', BusinessController.editInfoView3);
apiRouter.post('/business/addOpeningHourToBusiness/:id', BusinessController.addOpeningHourToBusiness);
apiRouter.post('/business/removeOpeningHourBusiness/:id', BusinessController.removeOpeningHourBusiness);
apiRouter.post('/business/editOpeningHourToBusiness/:id', BusinessController.editOpeningHourToBusiness);
apiRouter.post('/business/findAllByCat', BusinessController.findAllByCat);
apiRouter.post('/business/addComment', BusinessController.addComment);
apiRouter.get('/business/findcommentsbybusiness/:bid', BusinessController.findCommentsByBusiness);

apiRouter.post('/business/addlike/:id', BusinessController.LikeBusiness);
apiRouter.post('/business/removelike/:id', BusinessController.UnlikeBusiness);


apiRouter.post('/coupon/add', CouponController.add);
apiRouter.get('/coupon/listbybusiness/:id', CouponController.findByBusinessId);
apiRouter.get('/coupon/remove/:id', CouponController.remove);
apiRouter.get('/coupon/get/:id', CouponController.getById);


apiRouter.get('/newsfeed/:id', CommentaireController.findByRegion);


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