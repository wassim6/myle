'use strict';


MetronicApp.controller('BusinessEditAdresseCtrl', function($rootScope, $scope, $http, $timeout, $stateParams,  BusinessService, uiGmapGoogleMapApi, toaster, AdressService) {
    
    //Get Busines info
    var businesId = $stateParams.id;
    $scope.businesId=businesId;
    
    $scope.gouverneras=AdressService.GetAllGouvernera().query();
    $scope.delegations=AdressService.GetAllDelegationName().query();
    

    $scope.gouvernera={};
    $scope.delegation={};
    
    var bInitial=$scope.b=BusinessService.GetById().get({ id:businesId});
    $scope.b=BusinessService.GetById().get({ id:businesId}, function() {

         $scope.latitude=$scope.b.latitude;
         $scope.longitude=$scope.b.longitude;
         $scope.adress=$scope.b.adress;
         $scope.delegation.selected=$scope.b.delegation;
         $scope.gouvernera.selected=$scope.b.gouvernera;
        
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
    
    
    
    
    $scope.editAdresse = function(valid){
        
        if(!valid){
            toaster.error("error", "Please complete all field !");
            return;
        }
        $scope.disable=true;
        BusinessService.EditAdress().save({
            "id":businesId,
            "adress": $scope.adress,
            "latitude":$scope.latitude,
            "longitude":$scope.longitude,
            "gouvernera":$scope.gouvernera.selected._id,
            "delegation":$scope.delegation.selected._id
        }, function(e){
            $scope.disable=false;
            toaster.success("success", "Business edited");
           
        }, function(e){
            toaster.error("error", e);
            $scope.disable=false;
        }); 
        
        
        
    };
    
    
    
    
    
});