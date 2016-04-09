'use strict';

myApp.controller('SigninCtrl2', function($rootScope, $scope, $window, loginService, $location) {

	//var x = loginService.isLoged().get({}, function(){console.log(x)});

    $scope.createUser = function(){
<<<<<<< HEAD
=======
       console.log(a);  
>>>>>>> aeba65d3feb4b71adbd8d428d1c7456ecfe4bc83
        loginService.createUserLocal().save({
               	email:$scope.email,
                password:$scope.password,
                firstName:$scope.firstName,
                lastName:$scope.lastName
        }, function(response){
<<<<<<< HEAD
            console.log("success");
=======
            console.log("success", "");
>>>>>>> aeba65d3feb4b71adbd8d428d1c7456ecfe4bc83
            
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
<<<<<<< HEAD
                
=======
            
            
>>>>>>> aeba65d3feb4b71adbd8d428d1c7456ecfe4bc83
        }, function(e){
            console.log("error", "login or password incorrect");
        });
    };
    
});