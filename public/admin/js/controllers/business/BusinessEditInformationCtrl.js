'use strict';


MetronicApp.controller('BusinessEditInformationCtrl', function($rootScope, $scope, $http, $timeout, $stateParams,  BusinessService,   toaster) {
    
    //Get Busines info
    var businesId = $stateParams.id;
    
    $scope.b=BusinessService.GetBusiness().get({ ID:businesId}, function() {
        

        
    });

    
    $scope.editInfo = function(){

        
        BusinessService.EditBusiness().save({
                "address":$scope.b.address,
                "country":$scope.b.country,
                "description":$scope.b.description,
                "id":$scope.b.id,
                "latitude":$scope.b.latitude,
                "longitude":$scope.b.longitude,
                "name":$scope.b.name,
                "postalCode":$scope.b.postalCode,
                "region":$scope.b.region,
                "tel":$scope.b.tel,
                "informations":{
                    "CNAM":$scope.b.informations.CNAM,
                    "appointment":$scope.b.informations.appointment,
                    "budget":$scope.b.informations.budget,
                    "check":$scope.b.informations.check,
                    "clim":$scope.b.informations.clim,
                    "creditCard":$scope.b.informations.creditCard,
                    "delivery":$scope.b.informations.delivery,
                    "mixte":$scope.b.informations.mixte,
                    "nonSmoking":$scope.b.informations.nonSmoking,
                    "reservation":$scope.b.informations.reservation,
                    "takeAway":$scope.b.informations.takeAway,
                    "tele":$scope.b.informations.tele,
                    "terrace":$scope.b.informations.terrace,
                    "tickets":$scope.b.informations.tickets,
                    "wifi":$scope.b.informations.wifi
                }
            }, function(){
                //console.log("ok");
                toaster.success("success", "Information edited");
                
            }, function(e){
                toaster.error("error", e);
            });
        
    };
     
    
    
    

    
    
    
});