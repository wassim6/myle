'use strict';


MetronicApp.controller('RestaurantListCtrl', function($rootScope, $scope, $http, $timeout, RestaurantService, DTOptionsBuilder, DTColumnBuilder, toaster) {
            
    
    $scope.finish=true;
    //toaster.success("success", "Business added");
    //toaster.error("error", e);
    
    
    $scope.restaurants=RestaurantService.GetAllRestaurant().query(function() {
        $scope.finish=false;
    });
    
    $scope.dtOptions = DTOptionsBuilder.newOptions().withOption('order', [0, 'asc']).withOption('lengthMenu', [50, 100, 150, 200]);
//desc    
    
    



    
    
});