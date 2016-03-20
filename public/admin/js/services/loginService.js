'use strict';

MetronicApp.factory('LoginService',function($resource){
    
    
    var service = {};
		
    service.Login=Login;
    
    service.CreateAdmin=CreateAdmin;
    service.AuthAdmin=AuthAdmin;
   
    return service;
    
    function Login(){
        return $resource('http://vynd-services.azurewebsites.net/Implementations/AdminService.svc/login');
    }
    
    function CreateAdmin(){
        return $resource('http://localhost\\:5000/api/admin');
    }
    
    function AuthAdmin(){
        return $resource('http://localhost\\:5000/api/admin/auth');
    }
    

    
    
});
