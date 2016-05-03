'use strict';

myApp.factory('profileService',function($resource, $http){
    
    
    var service = {};
		
    service.createUser=createUser;
    service.authetificationUser=authetificationUser;
    service.showInfo=showInfo;
    service.editInfo=editInfo;
    service.editPassword=editPassword;
    service.editPasswordMail=editPasswordMail;
    service.editInfo2=editInfo2;
    service.editInfo3=editInfo3;
    
    
    service.GetAllGouvernera=GetAllGouvernera;
    service.GetAllDelegation=GetAllDelegation;
    service.GetAllDelegationName=GetAllDelegationName;
    service.updateImg=updateImg;

    
    
   
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
    
    function editPassword(){
        return $resource('http://localhost\\:5000/api/user/editPassword');
    }
    
    function editInfo2(){
        return $resource('http://localhost\\:5000/api/user/edit2');
    }
    
    function editInfo3(){
        return $resource('http://localhost\\:5000/api/user/editInfoAdresse');
    }
    
    
    
    function GetAllGouvernera(){
        return $resource('http://localhost\\:5000/api/address/gouvernera/list'
        );
    }
    
    function GetAllDelegation(){
        return $resource('http://localhost\\:5000/api/address/delegation/list'
        );
    }
    
    function GetAllDelegationName(){
        return $resource('http://localhost\\:5000/api/address/delegationname/list'
        );
    }
    function updateImg(){
        return $resource('http://localhost\\:5000/api/user/editProfileImage/');
    }
    
   function editPasswordMail(){
        return $resource('http://localhost\\:5000/api/user/editPasswordMail/');
    }
});
