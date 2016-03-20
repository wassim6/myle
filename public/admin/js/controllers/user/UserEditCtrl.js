'use strict';

MetronicApp.controller('UserEditCtrl', function($rootScope, $scope, $http, $timeout, $stateParams, UserService, $location, toaster) {
    
    $scope.user={};
    var id=$stateParams.id;
     var user=UserService.GetUserById().get({ID:id}, function() {
         $scope.user=user;
/*         $scope.firstName=user.firstName;
         $scope.lastName=user.lastName;
         $scope.birthDate=user.birthDate;
         $scope.score=user.score;
         $scope.active=user.LoginCredential.active;
         $scope.blocked=user.LoginCredential.blocked;
         $scope.mail=user.LoginCredential.mail;
         $scope.login=user.LoginCredential.login;*/
        
     });
    
    
    
    $scope.edit=function(){
        console.log($scope.user);
        UserService.UserEdit().save({
                "ID":1,
                "birthDate":$scope.user.birthDate,
                "firstName":$scope.user.firstName,
                "imgData":$scope.img.base64,
                "lastName":$scope.user.lastName
            }, 
            function(){
                toaster.success("success", "User edited");

            }, function(e){
                toaster.error("error", e);
            });
    };
    
    $scope.delete= function(c){
        UserService.UserRemove().get({
            "Id":c.Id
        }, function(){
            $location.path("/user/list");
        })
    };
    
    
});