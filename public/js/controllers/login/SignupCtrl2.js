'use strict';

myApp.controller('SigninCtrl2', function($rootScope, $scope, $window, loginService, $location) {

	//var x = loginService.isLoged().get({}, function(){console.log(x)});

    $scope.createUser = function(){
       console.log(a);  
        loginService.createUserLocal().save({
               	email:$scope.email,
                password:$scope.password,
                firstName:$scope.firstName,
                lastName:$scope.lastName
        }, function(response){
            console.log("success", "");
            
            $rootScope.AuthenticatedUser = {
                username:response.username,
                password:response.password,
                email:response.email,
                codePostale:response.codePostale
            };
              //console.log(response);
           	  //console.log(response.codePostale);
            $location.path("/home");   
            
            
        }, function(e){
            console.log("error", "login or password incorrect");
        });
    };
    

    $scope.createUserFacebook = function(){
    	console.log("cc");
    	$window.open('http://localhost:5000/auth/facebook',"nom_popup","menubar=no, status=no, scrollbars=no, menubar=no, width=800, height=600");
    	
        loginService.createUserFacebook().get({
        }, function(response){
            console.log("success", "");
            
            $rootScope.AuthenticatedUser = {
                username:response.username,
                password:response.password,
                email:response.email,
                codePostale:response.codePostale
            };
              //console.log(response);
           	  //console.log(response.codePostale);
//            $location.path("/home");   
            
            
        }, function(e){
            console.log("error", "login or password incorrect");
        });
    };
    
});