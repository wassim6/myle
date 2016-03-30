'use strict';

MetronicApp.controller('SanteListCtrl', function($rootScope, $scope, $http, $timeout, SanteService, BusinessService, toaster) {
    
    $scope.finish=true;
    $scope.currentPage = 1;
    $scope.itemsPerPage = 50;
    $scope.list=SanteService.GetAll().query(function(){
        $scope.finish=false;
        $scope.total=$scope.list.length;
        //console.log($scope.list);
    });
    
    $scope.delete = function(bId, i){
          BusinessService.RemoveBusiness().get({
           "id":bId
           }, function(){
               toaster.success("success", "Business removed");
               $scope.list=SanteService.GetAll().query(function(){
                    $scope.finish=false;
                    $scope.total=$scope.list.length;
                    //console.log($scope.list);
                });

           }, function(e){
                 toaster.error("error", e);
       });
    };
    


    
    
    
});