'use strict';

myApp.factory('loginService',function($resource, $http){
    
    
    var service = {};
		
    service.createUser=createUser;
    service.authetificationUser=authetificationUser;
    service.showInfo=showInfo;
    service.getbyusername=getbyusername;
   
    return service;
    
    function createUser(){
        return $resource('http://localhost\\:5000/api/user');
    }
    
    function authetificationUser(){
        return $resource('http://localhost\\:5000/api/user/auth');
    }
    
    function showInfo(){
        return $resource('http://localhost\\:5000/api/user/show/:id',{id:'@id'});
    }
    
    function getbyusername(){
        return $resource('http://localhost\\:5000/api/user/getbyusername/:username',{username:'@username'});
    }
});
