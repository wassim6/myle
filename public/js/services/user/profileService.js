'use strict';

myApp.factory('profileService',function($resource, $http){
    
    
    var service = {};
		
    service.createUser=createUser;
    service.authetificationUser=authetificationUser;
    
   
    return service;
    
    function createUser(){
        return $resource('http://localhost\\:5000/api/user');
    }
    
    function authetificationUser(){
        return $resource('http://localhost\\:5000/api/user/auth');
    }
    
    
});
