'use strict';


MetronicApp.controller('BusinessEditInformationCtrl', function($rootScope, $scope, $http, $timeout, $stateParams,  BusinessService,   toaster) {
    
    //Get Busines info
    var businesId = $stateParams.id;
    $scope.businesId=businesId;
    
    $scope.b=BusinessService.GetById().get({ id:businesId}, function() {});

    
    $scope.editInfoView1 = function(valid){
        if(!valid){
            toaster.error("error", "Please complete all field !");
            return;
        }
        $scope.disable=true;
        BusinessService.EditInfoView1().save({
                "id":businesId,
                "tel":$scope.b.tel,
                "fax":$scope.b.fax,
                "email":$scope.b.email,
                "site":$scope.b.site,
                "facebook":$scope.b.facebook,
                "googleplus":$scope.b.googleplus,
            }, function(){
                toaster.success("success", "Information edited");
                $scope.disable=false;
            }, function(e){
                toaster.error("error", e);
                $scope.disable=false;
            });
    };
    
    
    $scope.editInfoView2 = function(){
        $scope.disable=true;
        BusinessService.EditInfoView2().save({
                "id":businesId,
                "cnam":$scope.b.cnam,
                "appointment":$scope.b.appointment,
                "clim":$scope.b.clim,
                "creditCard":$scope.b.creditCard,
                "delivery":$scope.b.delivery,
                "reservation":$scope.b.reservation,
                "takeAway":$scope.b.takeAway,
                "terrace":$scope.b.terrace,
                "ticketsRestau":$scope.b.ticketsRestau,
                "fauteuilRoulant":$scope.b.fauteuilRoulant,
                "adapteEnfants":$scope.b.adapteEnfants,
                "adapteGroupe":$scope.b.adapteGroupe,
                "television":$scope.b.television,
                "chiensAutorises":$scope.b.chiensAutorises,
                "wifi":$scope.b.wifi,
                "alcool":$scope.b.alcool,
                "happyHour":$scope.b.happyHour,
                "fumeur":$scope.b.fumeur,
                "espaceNonFumeur":$scope.b.espaceNonFumeur,
                "serviceADomicile":$scope.b.serviceADomicile
            }, function(){
                toaster.success("success", "Information edited");
                $scope.disable=false;
            }, function(e){
                toaster.error("error", e);
                $scope.disable=false;
            });
    };
    
    $scope.editInfoView3 = function(){
        $scope.disable=true;
        BusinessService.editInfoView3().save({
                "id":businesId,
                "budget":$scope.b.budget,
                "budgetRange":$scope.b.budgetRange
            }, function(){
                toaster.success("success", "Information edited");
                $scope.disable=false;
            }, function(e){
                toaster.error("error", e);
                $scope.disable=false;
            });
    };
    
    
    
});