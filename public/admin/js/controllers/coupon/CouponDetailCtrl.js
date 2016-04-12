'use strict';

MetronicApp.controller('CouponDetailCtrl', function($rootScope, $scope, $http, $timeout, $stateParams, BusinessService,
   DTOptionsBuilder, DTColumnBuilder, toaster) {
        $scope.businesId=$stateParams.id;

    
        $scope.c=BusinessService.GetCoupon().get({id:$scope.businesId});

  
    
    
});