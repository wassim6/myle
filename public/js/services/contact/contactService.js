'use strict';

myApp.factory('contactService',function($resource, $http){
    
    
    var service = {};
		
    service.sendMail=sendMail;
    

    return service;
    
    

    function sendMail(){
        return $resource('http://localhost\\:5000/api/sendMail');
    }
    
    
});
