'use strict';

myApp.controller('SigninCtrl', function($rootScope, $scope, $window, loginService, $location) {

    $scope.authetificationUser= function(l){
        
        
        loginService.authetificationUser().save({
            "username":l.username,
            "password":l.password
        }, function(response){
            
            loginService.getbyusername().get({
               username:response.username 
            }, function(m){
                $rootScope.AuthenticatedUser = {
                    username:response.username,
                    password:response.password,
                    id:m._id
                };

                var today = new Date();
                var expired = new Date(today);
                expired.setDate(today.getHours() + 2);            
                setCookie('user',response.username,expired);
                setCookie('useri',m._id,expired);
                setCookie('userp',response.password,expired);
                $window.location.reload();    
            }, function(e){
                console.log(e);
            });
            
            
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