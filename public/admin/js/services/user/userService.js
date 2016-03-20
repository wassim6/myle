'use strict';

MetronicApp.factory('UserService',function($resource){
    
    
    var service = {};
		
    service.GetAllUser=GetAllUser;
    service.GetUserById=GetUserById;
    service.UserEdit=UserEdit;
    service.UserRemove=UserRemove;
   
    return service;
    
    function GetAllUser(){
        return $resource('http://vynd-services.azurewebsites.net/implementations/UserService.svc/AdminList',
                         {},
                         { get: { method: "GET", isArray: true } } );
    }
    
    function GetUserById(){
        return $resource('http://vynd-services.azurewebsites.net/implementations/UserService.svc/:ID',
                         {ID:'@ID'});
    }
    
    function UserEdit(){
        return $resource('http://vynd-services.azurewebsites.net/implementations/UserService.svc/:ID/edit',
                         {ID:'@ID'});
    }
    
    function UserRemove(){
        return $resource('http://vynd-services.azurewebsites.net/implementations/UserService.svc/:ID/remove',
                         {ID:'@ID'});
    }
    

    

    
    
});
