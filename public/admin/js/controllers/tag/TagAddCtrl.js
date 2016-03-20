'use strict';

MetronicApp.controller('TagAddCtrl', function($rootScope, $scope, $http, $timeout, $stateParams, TagService, DTOptionsBuilder, DTColumnBuilder) {
    
    
     $scope.success=false;
    $scope.error=false;
    $scope.name="";
    $scope.disable=false;
    
    
    
    
    $scope.add = function(){
        if($scope.name.length>=4 && $scope.name.length<=200){
               $scope.disable=true;
               TagService.AddTag().save({"name":$scope.name}, function(){
                    $scope.disable=false;
                    $scope.success=true;
                    $scope.error=false; 
               }, function(){
                   $scope.disable=false;
               });
        }
        else{
            $scope.success=false;
            $scope.error=true;
        }
    };
    
    
});