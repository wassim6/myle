'use strict';

myApp.factory('loginService',function($resource, $http){
    
    
    var service = {};
		
    service.createUser=createUser;
    service.authetificationUser=authetificationUser;
    service.showInfo=showInfo;
    service.getbyusername=getbyusername;

    service.isLoged=isLoged;
    service.createUserLocal=createUserLocal;
    service.createUserFacebook=createUserFacebook;

    service.logInLocal=logInLocal;
    service.logOut=logOut;

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



    function createUserLocal(){
        return $resource('http://localhost\\:5000/signup');
    }
    
    function createUserFacebook(){
        return $resource('http://localhost\\:5000/auth/facebook');
    }

    function isLoged(){
        return $resource('http://localhost\\:5000/isconnected');
    }


    function logInLocal(){
        return $resource('http://localhost\\:5000/login');
    }
    function logOut(){
        return $resource('http://localhost\\:5000/logout');
    }


});
