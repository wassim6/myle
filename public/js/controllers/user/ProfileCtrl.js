'use strict';

myApp.controller('ProfileCtrl', function($rootScope, $scope, $window, profileService, $location, toaster) {

        $scope.gouverneras=profileService.GetAllGouvernera().query();
        $scope.delegations=profileService.GetAllDelegationName().query();
        $scope.gouvernera={};
        $scope.delegation={};
	var Id=$rootScope.AuthenticatedUser.id;
	var b=profileService.showInfo().get({
    	id:Id
    }, function(){
    	console.log(b);
        
        $scope.data = b;
        
        console.log($scope.data.delegation);
        $scope.delegation.selected=$scope.data.delegation;
        $scope.gouvernera.selected=$scope.data.gouvernera;
        
    });
    
    $scope.img={};
        
        $scope.editProfile = function(){
        
        profileService.editInfo().save({
                "id":Id,
                "firstName":$scope.data.firstName,
                "lastName":$scope.data.lastName,
                "age":$scope.data.age,
                "tel":$scope.data.tel
            }, function(){
                toaster.success("success", "Information edited");
            }, function(e){
                toaster.error("error", e);
            });
    }; 
    
     
    
    $scope.editProfile2 = function(){
        
        profileService.editInfo2().save({
                "id":Id,
                "facebook":$scope.data.facebook,
                "google":$scope.data.google
            }, function(){
                toaster.success("success", "Information edited");
            }, function(e){
                toaster.error("error", e);
            });
    }; 
    
    $scope.editProfile3 = function(){
        
        profileService.editInfo3().save({
                "id":Id,
                "gouvernera":$scope.gouvernera.selected._id,
                "delegation":$scope.delegation.selected._id,
                "adresse":$scope.data.adresse,
                "codePostale":$scope.data.codePostale
            }, function(){
                toaster.success("success", "Information edited");
            }, function(e){
                toaster.error("error", e);
            });
    }; 
    
    $scope.updateImage= function(img){
      profileService.updateImg().save({
          id:$rootScope.AuthenticatedUser.id,
          img:img
        }, function(){
            toaster.success("Succes", "Votre image a été enregistré")
            var b=profileService.showInfo().get({
                id:Id
            }, function(){
                $scope.data = b;
                $scope.delegation.selected=$scope.data.delegation;
                $scope.gouvernera.selected=$scope.data.gouvernera;
            });
        }, function(e){
            toaster.error("Erreur", "Une erreur est survenu, veillez resseyez ultérierement");
        });  
    };
        
});	