'use strict';


MetronicApp.controller('BusinessEditTagCtrl', function($rootScope, $scope, $http, $timeout, $stateParams,  BusinessService, TagService, toaster) {
    
    //Get Busines info
    var businesId = $stateParams.id;
    $scope.businesId=businesId;
    
    $scope.b=BusinessService.GetById().get({ id:businesId}, function() {});
    //finish get business info
    
    $scope.tag = {};
    
    $scope.tags = TagService.GetAll().query();

    
    $scope.addTag = function(tag){
        
        if(typeof(tag.selected)!='undefined'){
               BusinessService.AddTagToBusiness().save({
                   "id":businesId,
	               "tag":{_id:tag.selected._id, name:tag.selected.name}
               }, function(){
                   toaster.success("success", "Tag added to business");
                   var b=BusinessService.GetById().get({ id:businesId}, function() {
                       $scope.b.tag=b.tag;
                    });
               }, function(e){
                     toaster.error("error", "duplicate tag or tag not found");
               });
        }
        else{
            toaster.error("error", "Select a valid tag");
        }
    };
    
    $scope.remove = function(tag){
          BusinessService.RemoveTagFromBusiness().save({
                   "id":businesId,
	               "tag":tag
               }, function(){
                   toaster.success("success", "Tag removed from business");
                   var tags=BusinessService.GetById().get({ id:businesId}, function() {
                       $scope.b.tag=tags.tag;
                    });
               }, function(e){
                     toaster.error("error", e);
               });
    };
    
    
    
});