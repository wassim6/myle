'use strict';


MetronicApp.controller('BusinessEditAdresseCtrl', function($rootScope, $scope, $http, $timeout, $stateParams,  BusinessService, uiGmapGoogleMapApi, toaster) {
    
    //Get Busines info
    var businesId = $stateParams.id;
    $scope.businesId=businesId;
    
    var bInitial=$scope.b=BusinessService.GetBusiness().get({ ID:businesId});
    $scope.b=BusinessService.GetBusiness().get({ ID:businesId}, function() {

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
    
    
    
    $scope.refresh = function(){
            //console.log("cc");
            //console.log($scope.latitude+" - "+$scope.longitude);
        $scope.map= {center: {latitude: $scope.latitude, longitude: $scope.longitude }, zoom: 8 };
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
        
    };
        
    $scope.getPosition = function(){
        var options = {
                enableHighAccuracy: true
        };
        navigator.geolocation.getCurrentPosition(function(pos) {
            var position = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
            $scope.latitude=pos.coords.latitude;
            $scope.longitude=pos.coords.longitude;
                //console.log($scope.b.latitude+"  "+$scope.b.longitude);
            $scope.refresh();
            $scope.$apply();
            
        }, 
            function(error) {                    
                alert('Unable to get location: ' + error.message);
        }, options);        
    };
    
    
    
    
    $scope.editAdresse = function(postalCode, address, region, latitude, longitude){
        
        BusinessService.EditBusiness().save({
                "address":address,
                "country":bInitial.country,
                "description":bInitial.description,
                "id":bInitial.id,
                "latitude":latitude,
                "longitude":longitude,
                "name":bInitial.name,
                "postalCode":postalCode,
                "region":region,
                "tel":bInitial.tel    
            }, function(){
                //console.log("ok");
                toaster.success("success", "Adress edited");
                
            }, function(e){
                toaster.error("error", e);
            });
        
    };
    
    
    
    
    
});