'use strict';


MetronicApp.controller('BusinessEditTagCtrl', function($rootScope, $scope, $http, $timeout, $stateParams,  BusinessService, TagService, toaster) {
    
    //Get Busines info
    var businesId = $stateParams.id;
    $scope.businesId=businesId;
    
    $scope.b=BusinessService.GetBusiness().get({ ID:businesId}, function() {
    });
    //finish get business info
    
    $scope.tag = {};
    
    var tags = TagService.GetAllTag().get({}, function(){
        $scope.tags=tags.tags; 
    });

    
    $scope.addTag = function(tag){
        
        if(typeof(tag.selected)!='undefined'){
               BusinessService.AddTagToBusiness().save({
                   "businessId":businesId,
	               "tagId":tag.selected.Id
               }, function(){
//                   alert('sub-category added');
                   toaster.success("success", "Tag added to business");
                   $scope.b=BusinessService.GetBusiness().get({ ID:businesId}, function() {
                    });
               }, function(e){
                     toaster.error("error", e);
               });
        }
        else{
            toaster.error("error", "Select a valid tag");
        }
    };
    
    $scope.remove = function(tag){
          BusinessService.RemoveTagFromBusiness().save({
                   "businessId":businesId,
	               "tagId":tag.Id
               }, function(){
//                   alert('sub-category added');
                   toaster.success("success", "Tag removed from business");
                   $scope.b=BusinessService.GetBusiness().get({ ID:businesId}, function() {
                    });
               }, function(e){
                     toaster.error("error", e);
               });
    };
    
    
    
});