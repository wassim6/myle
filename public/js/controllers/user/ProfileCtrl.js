'use strict';

myApp.controller('ProfileCtrl', function($rootScope, $scope, $window, profileService, $location) {

    
        
        
         var Id=$routeParams.id;
         var b=profileService.showInfo().get({
    	id:Id
    }, function(){

    });
        
        
        
    });