'use strict';


MetronicApp.controller('BusinessEditCtrl', function($rootScope, $scope, $http, $timeout, $stateParams,  BusinessService,CategoryService, SubCategoryService, TagService, uiGmapGoogleMapApi, toaster) {
    
    //Get Busines info
    var businesId = $stateParams.id;
    $scope.businesId=businesId;
    $scope.disable=false;
    
    $scope.b=BusinessService.GetBusiness().get({ ID:businesId}, function() {
         //console.log($scope.b);
         $scope.name=$scope.b.name;
         $scope.tel=$scope.b.tel;
         $scope.description=$scope.b.description;
         
        
         $scope.latitude=$scope.b.latitude;
         $scope.longitude=$scope.b.longitude;
         $scope.address=$scope.b.address;
         $scope.postalCode=$scope.b.postalCode;
         $scope.region=$scope.b.region;
        
        $scope.map= {center: {latitude: $scope.latitude, longitude: $scope.longitude }, zoom: 7 };
        $scope.options = {scrollwheel: true};
        $scope.coordsUpdates = 0;
        $scope.dynamicMoveCtr = 0;
        $scope.marker = {
          id: 0,
          coords: {
            latitude:  $scope.latitude,
            longitude:  $scope.longitude
          },
          options: { draggable: true },
          events: {
            dragend: function (marker, eventName, args) {
              //$log.log('marker dragend');
              var lat = marker.getPosition().lat();
              var lon = marker.getPosition().lng();
              $scope.latitude=lat;
              $scope.longitude=lon;

              $scope.marker.options = {
                draggable: true,
                labelContent: "lat: " + $scope.marker.coords.latitude + ' ' + 'lon: ' + $scope.marker.coords.longitude,
                labelAnchor: "100 0",
                labelClass: "marker-labels"
              };
            }
          }
        };
        //console.log($scope.map);
        
    });
    //finish get business info
    
    $scope.editInfo = function(name, tel, description){
        //toaster.success("success", "seccess body");
        //toaster.error("title", "text2");
        
        //console.log(name+"  "+tel+"  "+description);
        //console.log($scope.b);
        $scope.disable=true;
        
        BusinessService.EditBusiness().save({
                "address":$scope.b.address,
                "country":$scope.b.country,
                "description":description,
                "id":$scope.b.id,
                "latitude":$scope.b.latitude,
                "longitude":$scope.b.longitude,
                "name":name,
                "postalCode":$scope.b.postalCode,
                "region":$scope.b.region,
                "tel":tel
            }, function(){
                toaster.success("success", "Information edited");
                $scope.disable=false;
                
            }, function(e){
                toaster.error("error", e);
                $scope.disable=false;
            });
        
        
    };
     
    
    
    
    
});