'use strict';

MetronicApp.controller('TagDetailCtrl', function($rootScope, $scope, $http, $timeout, $stateParams, $state,  TagService, $location, toaster) {
    
    $scope.tag={};
    var id=$stateParams.id;
    $scope.tag=TagService.GetById().get({id:id}, function(){
        //console.log($scope.tag.name);
        if(typeof($scope.tag.name)=='undefined')
            $location.path("/tag/list"); 
        //console.log($scope.tag);   
    }, function(){
            $state.go('tag/list');
            $location.path("/tag/list");      
    });
    
    
    
    $scope.delete= function(c){
        TagService.RemoveTag().get({
            "_id":c._id
        }, function(){
            toaster.success("success", "Tag succesfuly removed");
                $location.path("/tag/list");
        }, function(){
               toaster.error("error", "Tag not found !");
                $location.path("/tag/list");
        });
    };
    
    
});