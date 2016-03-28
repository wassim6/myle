'use strict';

MetronicApp.controller('TagEditCtrl', function($rootScope, $scope, $http, $timeout, $stateParams, TagService, $location, toaster ) {
    
    $scope.disable=false;
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
    
    
    $scope.edit = function(){
        if($scope.tag.name.length>=3 && $scope.tag.name.length<=200){
            $scope.disable=true;
            TagService.EditTag().save({
                "_id":$scope.tag._id,
                "name":$scope.tag.name
            }, function(){
                    $scope.disable=false;
                    toaster.success("success", "tag name edited");
                   }, function(){
                   $scope.disable=false;
                    toaster.error("error", "tag name duplicated !");
           });
        }
        else{
            $scope.disable=false;
            toaster.error("error", "name must be betwenn 3 and 200 caracters");
        }
    }
    
    
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