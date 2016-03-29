'use strict';

MetronicApp.controller('BusinessAddCtrl', function($rootScope, $scope, $http, $timeout,  BusinessService, uiGmapGoogleMapApi, $log, toaster, TagService, AdressService) {
    
    $scope.success=false;
    $scope.error=false;
    $scope.disable=false;
    
    
    $scope.categories=[
        {name:"Alimentation"},{name:"Animaux"},{name:"Auto-Motos"},{name:"Artisans"},{name:"Sport"},{name:"Beauté et bien être"},{name:"voyage et loisirs"},{name:"High Tech"},{name:"Enfant et Education"},
        {name:"Mode et Habillement"},{name:"Fourniture Administratifs"},{name:"Maison et Deco"},{name:"Sortie"},{name:"Service"}
    ];
    $scope.subCategories=TagService.GetAll().query();
    $scope.gouverneras=AdressService.GetAllGouvernera().query();
    $scope.delegations=AdressService.GetAllDelegationName().query();
    
    $scope.category={};
    $scope.subCategory={};
    $scope.gouvernera={};
    $scope.delegation={};
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
    
    
    
    $scope.add = function(valid){
        if(!valid){
            toaster.error("error", "Please complete all field !");
            return;
        }
        $scope.disable=true;
       BusinessService.AddBusiness().save({            
            "adress": $scope.b.address,
            "description":$scope.b.description,
            "latitude":$scope.b.latitude,
            "longitude":$scope.b.longitude,
            "name":$scope.b.name,
            "fax":$scope.b.fax,
            "tel":$scope.b.tel,
            "gouvernera":$scope.gouvernera.selected._id,
            "delegation":$scope.delegation.selected._id,
            "category":$scope.category.selected._id,
            "sousCategory":$scope.subCategory.selected._id

        }, function(e){
            $scope.disable=false;
            toaster.success("success", "Business added");
           
        }, function(e){
            toaster.error("error", e);
            $scope.disable=false;
        }); 
        
    };

    
    
})