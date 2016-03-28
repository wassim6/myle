'use strict';

MetronicApp.controller('BusinessAdd2Ctrl', function($rootScope, $scope, $http, $timeout,  BusinessService, uiGmapGoogleMapApi, $log, toaster) {
    
    $scope.success=false;
    $scope.error=false;
    $scope.disable=false;
    
    
    $scope.b={};
    $scope.b.latitude=36.86176800815239;
    $scope.b.longitude=10.1643705368042;
    $scope.map= {center: {latitude: $scope.b.latitude, longitude: $scope.b.longitude }, zoom: 8 };
    $scope.options = {scrollwheel: true};
    $scope.coordsUpdates = 0;
    $scope.dynamicMoveCtr = 0;
    $scope.marker = {
      id: 0,
      coords: {
        latitude:  $scope.b.latitude,
        longitude:  $scope.b.longitude
      },
      options: { draggable: true },
      events: {
        dragend: function (marker, eventName, args) {
          //$log.log('marker dragend');
          var lat = marker.getPosition().lat();
          var lon = marker.getPosition().lng();
          $scope.b.latitude=lat;
          $scope.b.longitude=lon;

          $scope.marker.options = {
            draggable: true,
            labelContent: "lat: " + $scope.marker.coords.latitude + ' ' + 'lon: ' + $scope.marker.coords.longitude,
            labelAnchor: "100 0",
            labelClass: "marker-labels"
          };
        }
      }
    };
    
    //finich  config map
    
    $scope.refresh = function(){
        console.log($scope.b.latitude+" - "+$scope.b.longitude);
        $scope.map= {center: {latitude: $scope.b.latitude, longitude: $scope.b.longitude }, zoom: 8 };
        $scope.options = {scrollwheel: true};
        $scope.coordsUpdates = 0;
        $scope.dynamicMoveCtr = 0;
        $scope.marker = {
          id: 0,
          coords: {
            latitude:  $scope.b.latitude,
            longitude:  $scope.b.longitude
          },
          options: { draggable: true },
          events: {
            dragend: function (marker, eventName, args) {
              //$log.log('marker dragend');
              var lat = marker.getPosition().lat();
              var lon = marker.getPosition().lng();
              $scope.b.latitude=lat;
              $scope.b.longitude=lon;

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
            $scope.b.latitude=pos.coords.latitude;
            $scope.b.longitude=pos.coords.longitude;
            //console.log($scope.b.latitude+"  "+$scope.b.longitude);
            $scope.refresh();
            $scope.$apply();
            
        }, 
            function(error) {                    
                alert('Unable to get location: ' + error.message);
        }, options);        
    };
    
    
    $scope.cnam=false;
    $scope.appointment=false;
    $scope.check=false;
    $scope.clim=false;
    $scope.creditCard=false;
    $scope.delivery=false;
    $scope.mixte=false;
    $scope.nonSmoking=false;
    $scope.reservation=false;
    $scope.takeAway=false;
    $scope.tele=false;
    $scope.terrace=false;
    $scope.tickets=false;
    $scope.wifi=false;
    
    $scope.add = function(valid){
        if(!valid){
            toaster.error("error", "Please complete all field !");
            return;
        }
        $scope.disable=true;
        //console.log($scope.cnam);
        
        //console.log($scope.imageSource);
        
       BusinessService.AddBusiness().save({            
            "address": $scope.b.address,
            "country": "Tunisie",
            "description":$scope.b.description,
            "latitude":$scope.b.latitude,
            "longitude":$scope.b.longitude,
            "name":$scope.b.name,
            "postalCode":$scope.b.postalCode,
            "region":$scope.b.region,
            "tel":$scope.b.tel,
            "informations":{
                "CNAM":$scope.cnam,
                "appointment":$scope.appointment,
                "budget":$scope.budget,
                "check":$scope.check,
                "clim":$scope.clim,
                "creditCard":$scope.creditCard,
                "delivery":$scope.delivery,
                "mixte":$scope.mixte,
                "nonSmoking":$scope.nonSmoking,
                "reservation":$scope.reservation,
                "takeAway":$scope.takeAway,
                "tele":$scope.tele,
                "terrace":$scope.terrace,
                "tickets":$scope.tickets,
                "wifi":$scope.wifi
            }
        }, function(e){
            $scope.disable=false;
            toaster.success("success", "Business added");
               
        }, function(e){
            toaster.error("error", e);
            $scope.disable=false;
        }); 
        
    };
    
     

    
    
    
    
    

    
    
})