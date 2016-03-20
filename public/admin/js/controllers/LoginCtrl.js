'use strict';

MetronicApp.controller('LoginCtrl', function($rootScope, $scope, $http, $timeout, LoginService, toaster, $location, $state) {


    $scope.loginGo= function(l){
        
        LoginService.AuthAdmin().save({
            "mail":l.mail,
            "pass":l.pass
            
        }, function(response){
            toaster.success("success", "");
            $rootScope.AuthenticatedUser = {
                id : response._id,
                firstName:response.firstName,
                lastName:response.lastName,
                mail:response.mail
            };
            var today = new Date();
            var expired = new Date(today);
            expired.setDate(today.getHours() + 2);            
            setCookie('user',response.mail,expired);
            setCookie('userp',l.pass,expired);
            $state.go('dashboard');
            $location.path("/dashboard");   
            
            
        }, function(e){
            toaster.error("error", "login or password incorect");
        });
    };
    
    
    $scope.CreateAdmin = function(a){
//      console.log(a);  
        LoginService.CreateAdmin().save({
              mail: a.mail,
              pass: a.password,
              firstName:a.firstName,
              lastName:a.lastName
        }, function(m){
            if(m.code==0)
                toaster.success("success", "Admin created");
            else if(m.code==1){
                toaster.error("error", "Email alerdy exist");
            }
            else{
                toaster.error("error", "login or password incorect");
            }
        }, function(e){
            toaster.error("error", "");
            

        });
    };
    
//    CreateAdmin
    
});