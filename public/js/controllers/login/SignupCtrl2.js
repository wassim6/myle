'use strict';

myApp.controller('SigninCtrl2', function($rootScope, $scope, $window, loginService, $location, toaster) {

    //var x = loginService.isLoged().get({}, function(){console.log(x)});

    $scope.createUser = function(){
        loginService.createUserLocal().save({
                email:$scope.email,
                password:$scope.password,
                firstName:$scope.firstName,
                lastName:$scope.lastName
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
                    toaster.error("Erreur", "cette adresse email existe déja");
                }
            });
              //console.log(response);
              //console.log(response.codePostale);
            //$location.path("/home");   
            
            
        }, function(e){
            console.log("error", "login or password incorrect");
        });
    };
    

    $scope.createUserFacebook = function(){
        console.log("cc");
        $window.open('http://localhost:5000/auth/facebook',"nom_popup","menubar=no, status=no, scrollbars=no, menubar=no, width=800, height=600");
        
        loginService.createUserFacebook().get({
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
                    toaster.error("Erreur", "cette adresse email existe déja");
                }
            });
//            $location.path("/home");   
                
        }, function(e){
            console.log("error", "login or password incorrect");
        });
    };
    
});