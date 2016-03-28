'use strict';

MetronicApp.controller('SanteListCtrl', function($rootScope, $scope, $http, $timeout, SanteService) {
    
    $scope.finish=true;
    $scope.currentPage = 1;
    $scope.itemsPerPage = 50;
    $scope.list=SanteService.GetAll().query(function(){
        $scope.finish=false;
        $scope.total=$scope.list.length;
        //console.log($scope.list);
    });
    
    
    
    
});