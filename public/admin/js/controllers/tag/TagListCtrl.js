'use strict';

MetronicApp.controller('TagListCtrl', function($rootScope, $scope, $http, $timeout, $stateParams, TagService, DTOptionsBuilder, DTColumnBuilder) {
    
    
     $scope.tags=TagService.GetAll().query({}, function() {

     });
    
        $scope.dtOptions = DTOptionsBuilder.newOptions().withOption('order', [1, 'asc']).withOption('lengthMenu', [50, 100, 150, 200]);    
    
    
    
    
    $scope.delete= function(c){
        TagService.DeleteTag().save({
            "Id":c.Id
        }, function(){
            for(var i = 0; i < $scope.tags.length; i++) {
                if($scope.tags[i].Id == c.Id) {
                    $scope.tags.splice(i, 1);
                    break;
                }
            }
        })
    };
    
    
});