'use strict';

myApp.controller('SigninCtrl', function($rootScope, $scope, loginService, $location) {

 
    $scope.authetificationUser= function(l){
        
        $scope.cc=true;
        
        loginService.authetificationUser().save({
            "username":l.username,
            "password":l.password
            
        }, function(response){
            console.log("success", "");
            $scope.show=true;
            
            
            $rootScope.AuthenticatedUser = {
                username:response.username,
                password:response.password
            };
<<<<<<< HEAD
              
            $location.path("/user/profile");
            $scope.cc=false;
            
=======
            
            $location.path("/home");   
>>>>>>> d165b2cca6843dd3751ba2e646583399fd16134e
            
            
        }, function(e){
            console.log("error", "login or password incorrect");
        });
    };
    
    
    $scope.createUser = function(a){
       console.log(a);  
        loginService.createUser().save({
               username:a.username,
                password:a.password,
                email:a.email,
                codePostale:a.codePostale
        }, function(response){
            console.log("success", "");
            
            $rootScope.AuthenticatedUser = {
                
              
                username:response.username,
                password:response.password,
                email:response.email,
                codePostale:response.codePostale
            };
              console.log(response.email);
           console.log(response.codePostale);
            $location.path("/home");   
            
            
        }, function(e){
            console.log("error", "login or password incorrect");
        });
    };
    
//    CreateAdmin
    
});