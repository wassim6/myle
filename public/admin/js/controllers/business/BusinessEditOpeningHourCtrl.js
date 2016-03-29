'use strict';


MetronicApp.controller('BusinessEditOpeningHourCtrl', function($rootScope, $scope, $http, $timeout, $stateParams,  BusinessService, toaster, $modal) {
    
    var businesId = $stateParams.id;
    $scope.businesId=businesId;
    $scope.openingHour = {};
    $scope.closingHour = {};
    $scope.openDay = {};
    $scope.listHours=[];
    $scope.listDays=[];
    for(var i=0;i<48;i++){
        var h=zeroPad(Math.trunc(i*30/60));
        var m=zeroPad(Math.trunc(i*30%60));
        $scope.listHours.push({name:h+'h:'+m, val:i});
    }
    $scope.listDays.push({name:'Monday', val:0});
    $scope.listDays.push({name:'Tuesday', val:1});
    $scope.listDays.push({name:'Wednesday', val:2});
    $scope.listDays.push({name:'Thursday', val:3});
    $scope.listDays.push({name:'Friday', val:4});
    $scope.listDays.push({name:'Saturday', val:5});
    $scope.listDays.push({name:'Sunday', val:6});
    
    
    
    
    $scope.b=BusinessService.GetBusiness().get({ ID:businesId}, function() {
        //console.log($scope.b);
        for(var i=0;i<$scope.b.hours.length;i++){
            var openHour=(Math.trunc($scope.b.hours[i].open*30/60));
            var closeHour=(Math.trunc($scope.b.hours[i].close*30/60));
            openHour=zeroPad(openHour);
            closeHour=zeroPad(closeHour);
            $scope.b.hours[i].openStr=openHour+'h:'+zeroPad($scope.b.hours[i].open*30%60);
            $scope.b.hours[i].closeStr=closeHour+'h:'+zeroPad($scope.b.hours[i].close*30%60);
        }
    });

    
    $scope.addOpening = function(form, openingHour, closingHour, openDay){
        if(!form){
            toaster.error("error", "Please complete all field");
            return;
        }
        else{
            if(typeof(openingHour.selected)=='undefined' || typeof(closingHour.selected)=='undefined'
              || typeof(openDay.selected)=='undefined'){
                toaster.error("error", "Please complete all field");
                return;
            }
            BusinessService.AddOpeningDay().save({
                "BusinessId":businesId,
                "closingHour":closingHour.selected.val,
                "dayOfOpening":openDay.selected.val,
                "openingHour":openingHour.selected.val
                
            }, function(m){
                toaster.success("success", "Opening Day added");
                   $scope.b=BusinessService.GetBusiness().get({ ID:businesId}, function() {
                       for(var i=0;i<$scope.b.hours.length;i++){
                            var openHour=(Math.trunc($scope.b.hours[i].open*30/60));
                            var closeHour=(Math.trunc($scope.b.hours[i].close*30/60));
                            openHour=zeroPad(openHour);
                            closeHour=zeroPad(closeHour);
                            $scope.b.hours[i].openStr=openHour+'h:'+zeroPad($scope.b.hours[i].open*30%60);
                            $scope.b.hours[i].closeStr = closeHour + 'h:' +
                                    zeroPad($scope.b.hours[i].close*30%60);
                        }
                    });
            }, function(e){
                toaster.error("error", e);
            });
        }
    };
 
    $scope.remove = function(op){
          BusinessService.RemoveOpeningDay().save({
                   "OPID":op.id
               }, function(){
                   toaster.success("success", "Opening Day removed from business");
                   $scope.b=BusinessService.GetBusiness().get({ ID:businesId}, function() {
                       for(var i=0;i<$scope.b.hours.length;i++){
                            var openHour=(Math.trunc($scope.b.hours[i].open*30/60));
                            var closeHour=(Math.trunc($scope.b.hours[i].close*30/60));
                            openHour=zeroPad(openHour);
                            closeHour=zeroPad(closeHour);
                            $scope.b.hours[i].openStr=openHour+'h:'+zeroPad($scope.b.hours[i].open*30%60);
                            $scope.b.hours[i].closeStr = closeHour+'h:'+
                                zeroPad($scope.b.hours[i].close*30%60);
                        }
                    });
               }, function(e){
                     toaster.error("error", e);
               });
    };
    
    $scope.open = function (op,size) {
        var modalInstance = $modal.open({
          templateUrl: 'myModalContent.html',
          controller: 'ModalInstanceCtrl',
          size: size,
          resolve: {
            items: function () {
              return op;
            }
          }
        });
    };
    
    $rootScope.reloadBusiness = function(){
        $scope.b=BusinessService.GetBusiness().get({ ID:businesId}, function() {
        for(var i=0;i<$scope.b.hours.length;i++){
            var openHour=(Math.trunc($scope.b.hours[i].open*30/60));
            var closeHour=(Math.trunc($scope.b.hours[i].close*30/60));
            openHour=zeroPad(openHour);
            closeHour=zeroPad(closeHour);
            $scope.b.hours[i].openStr=openHour+'h:'+zeroPad($scope.b.hours[i].open*30%60);
            $scope.b.hours[i].closeStr=closeHour+'h:'+zeroPad($scope.b.hours[i].close*30%60);
        }
        });
    }
    
});

function ModalInstanceCtrl($rootScope, $scope, $modalInstance, BusinessService, items, toaster) {
    $scope.openingHour = {};
    $scope.closingHour = {};
    $scope.openDay = {};
    $scope.listHours=[];
    $scope.listDays=[];
    for(var i=0;i<48;i++){
        var h=zeroPad(Math.trunc(i*30/60));
        var m=zeroPad(Math.trunc(i*30%60));
        $scope.listHours.push({name:h+'h:'+m, val:i});
    }
     var dayName='';
    $scope.listDays.push({name:'Monday', val:0}); if(items.day==0) dayName='Monday';
    $scope.listDays.push({name:'Tuesday', val:1}); if(items.day==1) dayName='Tuesday';
    $scope.listDays.push({name:'Wednesday', val:2}); if(items.day==2) dayName='Wednesday';
    $scope.listDays.push({name:'Thursday', val:3}); if(items.day==3) dayName='Thursday';
    $scope.listDays.push({name:'Friday', val:4}); if(items.day==4) dayName='Friday';
    $scope.listDays.push({name:'Saturday', val:5}); if(items.day==5) dayName='Saturday';
    $scope.listDays.push({name:'Sunday', val:6}); if(items.day==6) dayName='Sunday';
     
     $scope.openDay.selected={name:dayName, val:items.day};
     $scope.openingHour.selected={name:items.openStr, val:items.open};
     $scope.closingHour.selected={name:items.closeStr, val:items.close};
     
    $scope.items = items;
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
        $rootScope.reloadBusiness();
    };
     
     $scope.edit = function(form, openingHour, closingHour, openDay){
        if(!form){
            toaster.error("error", "Please complete all field");
            return;
        }
        else{
            if(typeof(openingHour.selected)=='undefined' || typeof(closingHour.selected)=='undefined'
              || typeof(openDay.selected)=='undefined'){
                toaster.error("error", "Please complete all field");
                return;
            }
            BusinessService.EditOpeningDay().save({
                "id":$scope.items.id,
                "closingHour":closingHour.selected.val,
                "dayOfOpening":openDay.selected.val,
                "openingHour":openingHour.selected.val
            }, function(m){
                toaster.success("success", "Opening Day Edited");
            }, function(e){
                toaster.error("error", e);
            });
        }
    };
     
     
}

function zeroPad(n){
   return n < 10 ? '0'+n : n;
}