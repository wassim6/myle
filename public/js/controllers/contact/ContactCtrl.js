'use strict';

myApp.controller('ContactCtrl', function($rootScope, $scope, $window, contactService, $location, toaster) {

       
    $scope.sendMail = function(data){
        contactService.sendMail().save({
                "from":data.from,
                "subject":data.subject,
                "html":data.html
            }, function(){
                toaster.success("succès", "Le mail a été envoyer");
            $location.path("/contact");
            }, function(e){
                toaster.error("error", e);
                $location.path("/contact");
            });
    }; 
    
   
});	