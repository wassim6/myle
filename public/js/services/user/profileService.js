'use strict';

myApp.factory('profileService',function($resource, $http){
    
    
    var service = {};
		
    service.createUser=createUser;
    service.authetificationUser=authetificationUser;
    service.showInfo=showInfo;
    service.editInfo=editInfo;
    service.editInfo2=editInfo2;
    service.editInfo3=editInfo3;
   
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
    
    function editInfo(){
        return $resource('http://localhost\\:5000/api/user/edit');
    }
    
    function editInfo2(){
        return $resource('http://localhost\\:5000/api/user/edit2');
    }
    
    function editInfo3(){
        return $resource('http://localhost\\:5000/api/user/editInfoAdresse');
    }
    
    
    
});
