'use strict';

MetronicApp.controller('BusinessEditOpeningHourCtrl', function($rootScope, $scope, $http, $timeout, $stateParams,  BusinessService, toaster, $modal) {
    
/*    $scope.user = {
    name: 'awesome user'
  }; */
    
    var businesId = $stateParams.id;
    $scope.businesId=businesId;
    $scope.open=true;
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
    
    
    
    $scope.b=BusinessService.GetById().get({ id:businesId}, function() {
        //console.log($scope.b.openingTime);
        for(var i=0;i<$scope.b.openingTime.length;i++){
            if($scope.b.openingTime[i].open==1){
                var openHour=(Math.trunc($scope.b.openingTime[i].openingHour*30/60));
                var closeHour=(Math.trunc($scope.b.openingTime[i].closingHour*30/60));
                openHour=zeroPad(openHour);
                closeHour=zeroPad(closeHour);
                $scope.b.openingTime[i].openStr = openHour+'h:' + 
                    zeroPad($scope.b.openingTime[i].openingHour*30%60);
                    $scope.b.openingTime[i].closeStr = closeHour + 'h:'+ 
                        zeroPad($scope.b.openingTime[i].closingHour*30%60);
            }
            else{
                $scope.b.openingTime[i].openStr='-';
                $scope.b.openingTime[i].closeStr='-';
            }
        }
    });

    
    $scope.addOpening = function(form, openingHour, closingHour, openDay){
        if (!($scope.open instanceof Function) && $scope.open==true) {
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

                BusinessService.AddOpeningHourToBusiness().save({
                    "id":businesId,                    
                    "dayNumber":openDay.selected.val,
                    "openingHour":openingHour.selected.val,
                    "closingHour":closingHour.selected.val,
                    "open":1

                }, function(m){
                    toaster.success("success", "Opening Day added");
                    $rootScope.reloadBusiness();
                    /*
                    var nvId=m.openingTime[m.openingTime.length-1]._id;
                    $scope.b.openingTime.push({
                        dayNumber:openDay.selected.val,
                        openingHour:openingHour.selected.val,
                        closingHour:closingHour.selected.val,
                        open:1,
                        openStr:openingHour.selected.name,
                        closeStr:closingHour.selected.name
                    });*/
                    
                }, function(e){
                    toaster.error("error", e);
                });
            }
        }
        else{
               if(typeof(openDay.selected)=='undefined'){
                   toaster.error("error", "Please select day");
                    return;
               }
               else{
                BusinessService.AddOpeningHourToBusiness().save({
                    "id":businesId,                    
                    "dayNumber":openDay.selected.val,
                    "openingHour":0,
                    "closingHour":0,
                    "open":0

                }, function(m){
                    toaster.success("success", "Opening Day added");
                    var nvId=m.openingTime[m.openingTime.length-1]._id;
                    $rootScope.reloadBusiness();
                    /*
                    $scope.b.openingTime.push({
                        dayNumber:openDay.selected.val,
                        openingHour:0,
                        closingHour:0,
                        open:0,
                        openStr:'-',
                        closeStr:'-'
                    });*/
                    
                }, function(e){
                    toaster.error("error", e);
                });
               };
        }
    };
 
    $scope.remove = function(op){
          BusinessService.RemoveOpeningHourBusiness().save({
                   "id":businesId,
                    "openingTime":op
               }, function(){
                   toaster.success("success", "Opening Day removed from business");
                   for(var i=0;i<$scope.b.openingTime.length;i++){
                       if($scope.b.openingTime[i]._id==op._id){
                            $scope.b.openingTime.splice(i,1);
                            break;
                       }
                    }
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
        var b=BusinessService.GetById().get({ id:businesId}, function() {
            for(var i=0;i<b.openingTime.length;i++){
                if(b.openingTime[i].open==1){
                    var openHour=(Math.trunc(b.openingTime[i].openingHour*30/60));
                    var closeHour=(Math.trunc(b.openingTime[i].closingHour*30/60));
                    openHour=zeroPad(openHour);
                    closeHour=zeroPad(closeHour);
                    b.openingTime[i].openStr = openHour+'h:' + 
                        zeroPad(b.openingTime[i].openingHour*30%60);
                        b.openingTime[i].closeStr = closeHour + 'h:'+ 
                            zeroPad(b.openingTime[i].closingHour*30%60);
                }
                else{
                    b.openingTime[i].openStr='-';
                    b.openingTime[i].closeStr='-';
                }
            }
            $scope.b=b;
        });
    }
    
});

function ModalInstanceCtrl($rootScope, $scope, $modalInstance, $stateParams, BusinessService, items, toaster) {
    var businesId = $stateParams.id;
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
    $scope.listDays.push({name:'Monday', val:0}); if(items.dayNumber==0) dayName='Monday';
    $scope.listDays.push({name:'Tuesday', val:1}); if(items.dayNumber==1) dayName='Tuesday';
    $scope.listDays.push({name:'Wednesday', val:2}); if(items.dayNumber==2) dayName='Wednesday';
    $scope.listDays.push({name:'Thursday', val:3}); if(items.dayNumber==3) dayName='Thursday';
    $scope.listDays.push({name:'Friday', val:4}); if(items.dayNumber==4) dayName='Friday';
    $scope.listDays.push({name:'Saturday', val:5}); if(items.dayNumber==5) dayName='Saturday';
    $scope.listDays.push({name:'Sunday', val:6}); if(items.dayNumber==6) dayName='Sunday';
     $scope.open=items.open;
     $scope.openDay.selected={name:dayName, val:items.dayNumber};
     $scope.openingHour.selected={name:items.openStr, val:items.open};
     $scope.closingHour.selected={name:items.closeStr, val:items.close};
     
    $scope.items = items;
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
        $rootScope.reloadBusiness();
    };
     
     $scope.edit = function(form, openingHour, closingHour, openDay){
        if (!($scope.open instanceof Function) && $scope.open==true) {
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
                if(typeof(openingHour.selected.val)=='undefined' || 
                   typeof(closingHour.selected.val)=='undefined' ||
                   openingHour.selected.val==0 || closingHour.selected.val==0){
                    toaster.error("error", "Please complete all field");
                    return;
                }

                BusinessService.EditOpeningHourToBusiness().save({
                    "id":businesId,      
                    "idOpen":$scope.items._id,
                    "dayNumber":openDay.selected.val,
                    "openingHour":openingHour.selected.val,
                    "closingHour":closingHour.selected.val,
                    "open":1

                }, function(m){
                    toaster.success("success", "Opening Day edited");
                    $rootScope.reloadBusiness();
                    
                }, function(e){
                    toaster.error("error", e);
                });
            }
        }
        else{
               if(typeof(openDay.selected)=='undefined'){
                   toaster.error("error", "Please select day");
                    return;
               }
               else{
                   if($scope.open==false){
                       if(typeof(openDay.selected.val)!='undefined'){
                        BusinessService.EditOpeningHourToBusiness().save({
                            "id":businesId,                    
                            "idOpen":$scope.items._id,
                            "dayNumber":openDay.selected.val,
                            "openingHour":0,
                            "closingHour":0,
                            "open":0
                        }, function(m){
                            toaster.success("success", "Opening Day edited");
                            $rootScope.reloadBusiness();

                        }, function(e){
                            toaster.error("error", e);
                        });
                       }
                       else
                           toaster.success("success", "Opening Day edited");

                   }
               }
        }
    };
     
     
}

function zeroPad(n){
   return n < 10 ? '0'+n : n;
}