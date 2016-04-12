'use strict';

MetronicApp.controller('CouponListCtrl', function($rootScope, $scope, $http, $timeout, $stateParams, BusinessService,
   DTOptionsBuilder, DTColumnBuilder, toaster) {
        $scope.businesId=$stateParams.id;

      $scope.coupons=BusinessService.ListCouponByBusiness().query({
        id:$scope.businesId
      });


      $scope.delete = function(c){
           BusinessService.RemoveCoupon().get({
                "id":c._id
            }, function(e){
              var coupons=BusinessService.ListCouponByBusiness().query({
                id:$scope.businesId
              }, function(){
                $scope.coupons=coupons;
              });
              toaster.success("success", "Coupon delited");
            }, function(e){
                toaster.error("error", e);
            }); 

      }
    
    
});