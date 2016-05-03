'use strict';

myApp.controller("RequestAddCtrl" ,function ($scope, uiGmapGoogleMapApi) {

    init();
    {
	$scope.latitude=36.899575830680625;
	$scope.longitude=10.1896390914917;
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
    }
    
    
    
    $scope.requestAdd = function (){
        if
    }

});
