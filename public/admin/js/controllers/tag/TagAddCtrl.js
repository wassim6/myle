'use strict';

MetronicApp.controller('TagAddCtrl', function($rootScope, $scope, $http, $timeout, $stateParams, TagService, DTOptionsBuilder, DTColumnBuilder, toaster) {
    
    
     $scope.success=false;
    $scope.error=false;
    $scope.name="";
    $scope.disable=false;
    
    
    
    
    $scope.add = function(){
        if($scope.name.length>=4 && $scope.name.length<=200){
               $scope.disable=true;
               TagService.AddTag().save({"name":$scope.name}, function(){
                    $scope.disable=false;
                    toaster.success("success", "Tag succesfuly added");
               }, function(e){
                   toaster.error("error", "Duplicate name tag");
                   $scope.disable=false;
               });
        }
        else{
            toaster.error("error", "Enter Tag Name");
        }
    };
    
    
});