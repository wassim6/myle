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
                toaster.success("succès", "Information changée avec succès");
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
                toaster.success("succès", "Information changée avec succès");
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
                toaster.success("succès", "Information changée avec succès");
            }, function(e){
                toaster.error("error", e);
            });
    }; 
    
    $scope.editPassword = function(){
        if (angular.equals($scope.data.password, $scope.data.RePassword) == 0)
        {
            toaster.error("erreur", "Password non identique");
            return;
        }
        profileService.editPassword().save({
                "id":Id,
                "password":$scope.data.password
            }, function(){
                toaster.success("succès", "Mot de passe changé avec succès");
            }, function(e){
                toaster.error("error", e);
            });
    }; 
    
     $scope.editPasswordMail = function(){
        
        profileService.editPasswordMail().save({
                "email":data.to,
                "to":data.to
            }, function(){
                toaster.success("succès", "Mot de passe changé avec succès");
            }, function(e){
                toaster.error("error", e);
            });
    }; 
    
    $scope.updateImage= function(img){
      profileService.updateImg().save({
          id:$rootScope.AuthenticatedUser.id,
          img:img
        }, function(){
            toaster.success("succès", "Votre image a été enregistré")
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