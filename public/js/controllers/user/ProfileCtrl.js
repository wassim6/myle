'use strict';

myApp.controller('ProfileCtrl', function($rootScope, $scope, $window, profileService, $location) {

	var Id=$rootScope.AuthenticatedUser.id;
	var b=profileService.showInfo().get({
    	id:Id
    }, function(){
    	console.log(b);
    });
        
        
        
});	