'use strict';

MetronicApp.controller('UserDetailCtrl', function($rootScope, $scope, $http, $timeout, $stateParams, UserService, $location) {
    
    $scope.user={};
    var id=$stateParams.id;
     var user=UserService.GetUserById().get({ID:id}, function() {
         $scope.user=user;
     });
    
    
    
    
    
    $scope.delete= function(c){
        UserService.UserRemove().get({
            "Id":c.Id
        }, function(){
            $location.path("/user/list");
        })
    };
    
    
});