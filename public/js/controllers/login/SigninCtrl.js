'use strict';

myApp.controller('SigninCtrl', function($rootScope, $scope, $window, loginService, $location, toaster) {

    $scope.authetificationUser= function(l){
        if(typeof(l)=='undefined'){
            return;
        }
        loginService.logInLocal().save({
            "email":l.username,
            "password":l.password
        }, function(response){
            loginService.isLoged().get({},function(r){
                if(r.status==true){
                    toaster.success("Bienvenue "+r.user.firstName);
                    $rootScope.AuthenticatedUser = {
                        username:r.user.local.email,
                        id:r.user._id,
                        firstName:r.user.firstName,
                        lastName:r.user.lastName
                    };
                    $location.path("/home");

                }
                else{
                    toaster.error("Erreur", "email ou mot de passe invalide");
                }
            });
            /*
            return;
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
            });*/
            
            
        }, function(e){
            toaster.error("Erreur", "email ou mot de passe invalide");
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
    
    
    $scope.createUserFacebook = function(){
        $window.open('http://localhost:5000/auth/facebook',"nom_popup","menubar=no, status=no, scrollbars=no, menubar=no, width=800, height=600");
        $window.location.reload();    
    };


    $scope.createUserGoogle = function(){
        $window.open('http://localhost:5000/auth/google',"nom_popup","menubar=no, status=no, scrollbars=no, menubar=no, width=800, height=600");
        $window.location.reload();      
    };


});