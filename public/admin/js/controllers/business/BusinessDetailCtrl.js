'use strict';

MetronicApp.controller('BusinessDetailCtrl', function($rootScope, $scope, $http, $timeout, $stateParams,  BusinessService) {
    
    var businesId = $stateParams.id;
    
     $scope.b=BusinessService.GetBusiness().get({ ID:businesId}, function() {
         //console.log($scope.b);
         
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
          options: { draggable: false },
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



    
    
});