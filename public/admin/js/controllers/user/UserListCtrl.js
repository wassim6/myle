'use strict';

MetronicApp.controller('UserListCtrl', function($rootScope, $scope, $http, $timeout, $stateParams, UserService, DTOptionsBuilder, DTColumnBuilder) {
    
    $scope.users=UserService.GetAllUser().get({}, function() {
     });
    
    $scope.dtOptions = DTOptionsBuilder.newOptions().withOption('order', [1, 'asc']).withOption('lengthMenu', [50, 100, 150, 200]);    
    
    
    
    
    $scope.delete= function(c){
        UserService.UserRemove().get({
            "Id":c.Id
        }, function(){
            for(var i = 0; i < $scope.users.length; i++) {
                if($scope.users[i].Id == c.Id) {
                    $scope.users.splice(i, 1);
                    break;
                }
            }
        })
    };
    
    
});