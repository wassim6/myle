'use strict';


MetronicApp.controller('BusinessEditInformationCtrl', function($rootScope, $scope, $http, $timeout, $stateParams,  BusinessService,   toaster) {
    
    //Get Busines info
    var businesId = $stateParams.id;
    $scope.businesId=businesId;
    
    $scope.b=BusinessService.GetBusiness().get({ ID:businesId}, function() {
        

        
    });

    
    $scope.editInfo = function(){

        
        BusinessService.EditAditionalInfo().save({
                "ID":$scope.b.id,
                
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
                
            }, function(){
                //console.log("ok");
                toaster.success("success", "Information edited");
                
            }, function(e){
                toaster.error("error", e);
            });
        
    };
     
    
    
    

    
    
    
});