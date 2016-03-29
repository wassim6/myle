'use strict';


MetronicApp.controller('BusinessEditProfileImageCtrl', function($rootScope, $scope, $http, $timeout, $stateParams,  BusinessService, toaster) {
    
    //Get Busines info
    var businesId = $stateParams.id;
    $scope.businesId=businesId;
    
    $scope.b=BusinessService.GetBusiness().get({ ID:businesId}, function() {
    });
    //finish get business info
    
    $scope.img={};
    
    $scope.addImage = function(img){
        console.log(img);
        BusinessService.AddImage().save({
            "ID":$scope.b.id,
            "data":img.base64,
            "profileImage":true
        }, function(){
            toaster.success("success", "Img added");
            $scope.b=BusinessService.GetBusiness().get({ ID:businesId});
        }, function(e){
             toaster.error("error", e);
        });
    }
    
    
});