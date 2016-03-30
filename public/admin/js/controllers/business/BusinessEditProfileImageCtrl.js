'use strict';


MetronicApp.controller('BusinessEditProfileImageCtrl', function($rootScope, $scope, $http, $timeout, $stateParams,  BusinessService, toaster) {
    
    //Get Busines info
    var businesId = $stateParams.id;
    $scope.businesId=businesId;
    
    $scope.b=BusinessService.GetById().get({ id:businesId}, function() {
        if(typeof($scope.b.coverImage)=='undefined')
            $scope.b.coverImage='cover.jpg';
    });
    //finish get business info
    
    $scope.img={};
    $scope.img2={};
    
    $scope.editProfileImage = function(img, valid){
        if(!valid){
            toaster.error("error", "Please insert profile image !");
            return;
        }
        BusinessService.EditProfileImage().save({
            "id":businesId,
            "img":img.base64,
            "extention":img.filetype.split('/')[1]
        }, function(){
            toaster.success("success", "Img added");
            $scope.b=BusinessService.GetById().get({ id:businesId});
        }, function(e){
             toaster.error("error", e);
        });
    };

    $scope.editCoverImage = function(img, valid){
        if(!valid){
            toaster.error("error", "Please insert cover image !");
            return;
        }
        BusinessService.EditCoverImage().save({
            "id":businesId,
            "img":img.base64,
            "extention":img.filetype.split('/')[1]
        }, function(){
            toaster.success("success", "Img added");
            $scope.b=BusinessService.GetById().get({ id:businesId});
        }, function(e){
             toaster.error("error", e);
        });
    }
    

    $scope.reset = function(img){
        $scope.img={};
    }
    $scope.reset2 = function(img){
        $scope.img2={};
    }

});