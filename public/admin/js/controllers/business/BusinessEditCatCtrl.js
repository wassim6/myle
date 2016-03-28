'use strict';


MetronicApp.controller('BusinessEditCatCtrl', function($rootScope, $scope, $http, $timeout, $stateParams,  BusinessService,CategoryService, SubCategoryService, toaster) {
    

    
    //Get Busines info
    var businesId = $stateParams.id;
    $scope.businesId=businesId;
    
    $scope.b=BusinessService.GetBusiness().get({ ID:businesId}, function() {        
    });
    //finish get business info
    
    
    $scope.subCat = {};
    
     var subCategories=SubCategoryService.GetAllSubCat().get({}, function() {
         $scope.subCategories=subCategories.subCategory;         
     });

    
    $scope.addSubcat = function(subcat){
        if(typeof(subcat.selected)!='undefined'){
               BusinessService.AddSubCatToBusiness().save({
                   "businessId":businesId,
	               "subCategoryId":subcat.selected.Id
               }, function(){
                   toaster.success("success", "Sub-Category added");
                   $scope.b=BusinessService.GetBusiness().get({ ID:businesId}, function() {
                    });
               }, function(e){
                     toaster.error("error", e);
               });
        }
        else{
            toaster.error("error", "Select a valid sub-category");
        }
    };

    
    $scope.remove = function(subCat){
          BusinessService.RemoveSubCatFromBusiness().save({
                   "businessId":businesId,
	               "subCategoryId":subCat.Id
               }, function(){
                   toaster.success("success", "Sub-category removed from business");
                   $scope.b=BusinessService.GetBusiness().get({ ID:businesId}, function() {
                    });
               }, function(e){
                     toaster.error("error", e);
               });
    };
    
});