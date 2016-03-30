'use strict';


MetronicApp.controller('BusinessEditImageCtrl', function($rootScope, $scope, $http, $timeout, $stateParams,  BusinessService, toaster) {
    
    //Get Busines info
    var businesId = $stateParams.id;
    $scope.businesId=businesId;
    
    $scope.b=BusinessService.GetById().get({ id:businesId}, function() {
    });
    //finish get business info
    
    $scope.img={};
    
    $scope.addImage = function(img, valid){
        if(!valid){
            toaster.error("error", "Please insert a valid image !");
            return;
        }
        BusinessService.AddImage().save({
            "id":businesId,
            "img":img.base64,
            "extention":img.filetype.split('/')[1]
        }, function(){
            toaster.success("success", "Image added");
            $scope.b=BusinessService.GetById().get({ id:businesId});
        }, function(e){
             toaster.error("error", e);
        });    
    };
    
    $scope.deleteImage = function(img){
       BusinessService.RemoveImage().save({
            "id":businesId,
            "uri":img.uri
        }, function(){
            toaster.success("success", "Image removed");
            $scope.b=BusinessService.GetById().get({ id:businesId});
        }, function(e){
             toaster.error("error", e);
        });      
    };


    $scope.reset = function(img){
        $scope.img={};
    };

});