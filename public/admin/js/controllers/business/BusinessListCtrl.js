'use strict';



MetronicApp.controller('BusinessListCtrl', function($rootScope, $scope, $http, $timeout, BusinessService, DTOptionsBuilder, DTColumnBuilder, toaster) {
            
    
    $scope.finish=true;
    //toaster.success("success", "Business added");
    //toaster.error("error", e);
    
    
    $scope.business=BusinessService.GetAllBusiness().get({ ID:0}, function() {
       //console.log($scope.business.business);
        $scope.finish=false;
    });
    
    $scope.dtOptions = DTOptionsBuilder.newOptions().withOption('order', [0, 'asc']).withOption('lengthMenu', [50, 100, 150, 200]);
//desc    
    
    
    
    $scope.delete = function(id){
        console.log(id);
          //BusinessService.
    };



    
    
});