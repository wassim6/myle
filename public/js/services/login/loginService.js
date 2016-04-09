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
<<<<<<< HEAD
    service.logInLocal=logInLocal;
    service.logOut=logOut;
=======

>>>>>>> aeba65d3feb4b71adbd8d428d1c7456ecfe4bc83

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

<<<<<<< HEAD
    function logInLocal(){
        return $resource('http://localhost\\:5000/login');
    }
    function logOut(){
        return $resource('http://localhost\\:5000/logout');
    }

=======
>>>>>>> aeba65d3feb4b71adbd8d428d1c7456ecfe4bc83
});
