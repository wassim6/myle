'use strict';

MetronicApp.controller('TagEditCtrl', function($rootScope, $scope, $http, $timeout, $stateParams, TagService, $location, toaster ) {
    
    $scope.disable=false;
    var id=$stateParams.id;
    $scope.tag=TagService.GetById().query({id:id}, function() {
        $scope.tag=$scope.tag[0];
     });
    
    
    $scope.edit = function(){
        if($scope.tag.name.length>=3 && $scope.tag.name.length<=200){
            $scope.disable=true;
            TagService.EditTag().save({
                "_id":$scope.tag._id,
                "Id":$scope.tag.Id,
                "name":$scope.name
            }, function(){
                    $scope.disable=false;
                    toaster.success("success", "tag name edited");
                   }, function(){
                   $scope.disable=false;
                    toaster.error("error", "tag name must be betwenn 3 and 200 caracters");
           });
        }
        else{
            $scope.disable=false;
            toaster.error("error", "name must be betwenn 3 and 200 caracters");
        }
    }
    
    
    $scope.delete= function(c){
        TagService.DeleteTag().save({
            "Id":c.Id
        }, function(){
            $location.path("/tag/list");
        })
    };
    
    
});