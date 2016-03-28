'use strict';


MetronicApp.controller('BusinessEditImageCtrl', function($rootScope, $scope, $http, $timeout, $stateParams,  BusinessService, toaster) {
    
    //Get Busines info
    var businesId = $stateParams.id;
    $scope.businesId=businesId;
    
    $scope.b=BusinessService.GetBusiness().get({ ID:businesId}, function() {
    });
    //finish get business info
    
    $scope.img={};
    
    $scope.addImage = function(img){
        //console.log(img);
        BusinessService.AddImage().save({
            "ID":$scope.b.id,
            "data":img.base64,
            "profileImage":false
        }, function(){
            toaster.success("success", "Img added");
            $scope.b=BusinessService.GetBusiness().get({ ID:businesId});
        }, function(e){
             toaster.error("error", e);
        });
    };
    
    $scope.deleteImage = function(img){
       //console.log(img);
        BusinessService.DeletePhotoBusiness().get({
            ID:img.id
        }, function(){
             $scope.b=BusinessService.GetBusiness().get({ ID:businesId}, function() {
            });
            toaster.success("success", "Img deleted");
            
        }, function(e){
            toaster.error("error", e);
        });
          
    };
    
    
});