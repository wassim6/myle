'use strict';

MetronicApp.controller('SanteListCtrl', function($rootScope, $scope, $http, $timeout, SanteService) {
    
    $scope.finish=true;
    $scope.list=SanteService.GetAll().query(function(){
        $scope.finish=false;
        //console.log($scope.list);
    });
    
    
    
    
});