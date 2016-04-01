'use strict';

MetronicApp.controller('CouponAddCtrl', function($rootScope, $scope, $http, $timeout, $stateParams, BusinessService,
   DTOptionsBuilder, DTColumnBuilder, toaster) {
        $scope.businesId=$stateParams.id;
        $scope.dt = new Date();
        $scope.dtStart= new Date();
        $scope.dtEnd= new Date();
  	  	$scope.open = function($event) {
  	    	$event.preventDefault();
  	    	$event.stopPropagation();
  	    	$scope.opened = true;
  	  	};
  	  	$scope.dateOptions = {
  	    	formatYear: 'yy',
  	    	startingDay: 1
  	  	};
        $scope.open2 = function($event) {
          $event.preventDefault();
          $event.stopPropagation();
          $scope.opened2 = true;
        };

  	  	$scope.formats = ['dd-MM-yyyy'];
  	  	$scope.format = $scope.formats[0];
        $scope.img={}; $scope.imgs={};
    
  $scope.add = function(valid){
    if(!valid){
            toaster.error("error", "Please complete all field !");
            return;
        }
    if($scope.initialPrice<=$scope.newPrice){
      toaster.error("error", "Please verify the price !");
            return;
    }
    console.log($scope.img);
    console.log($scope.imgs)
        $scope.disable=true;
       BusinessService.AddCoupon().save({            
            "startDate":$scope.dtStart,
            "endDate":$scope.dtEnd,
            "title":$scope.title,
            "prixInitial":$scope.initialPrice,
            "prix":$scope.newPrice,
            "description":$scope.description,
            "condition":$scope.condition,
            "businessId":$scope.businesId,
            "image":$scope.img,
            "couponImage":$scope.imgs
        }, function(e){
            $scope.disable=false;
            toaster.success("success", "Coupon added");
           
        }, function(e){
            toaster.error("error", e);
            $scope.disable=false;
        }); 

  }
    
    
});