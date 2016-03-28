'use strict';

MetronicApp.controller('TagListCtrl', function($rootScope, $scope, $http, $timeout, $stateParams, TagService, DTOptionsBuilder, DTColumnBuilder, toaster) {
    
    
     $scope.tags=TagService.GetAll().query({}, function() {

     });
    
        $scope.dtOptions = DTOptionsBuilder.newOptions().withOption('order', [1, 'asc']).withOption('lengthMenu', [50, 100, 150, 200]);    
    
    
    
    
    $scope.delete= function(c){
        TagService.RemoveTag().get({
            "_id":c._id
        }, function(){
            toaster.success("success", "Tag succesfuly removed");
            for(var i = 0; i < $scope.tags.length; i++) {
                if($scope.tags[i]._id == c._id) {
                    $scope.tags.splice(i, 1);
                    break;
                }
            }
        }, function(){
               toaster.error("error", "Tag not found !");
        });
    };
    
    
    
    
});