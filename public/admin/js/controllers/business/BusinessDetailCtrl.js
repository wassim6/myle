'use strict';

MetronicApp.controller('BusinessDetailCtrl', function($rootScope, $scope, $http, $timeout, $stateParams,  BusinessService, CommentService, DTOptionsBuilder, DTColumnBuilder) {
    
    var businesId = $stateParams.id;

    
    var comments=CommentService.GetCommentByBusiness().get({ID:businesId, UID:0}, function(){
        //console.log(comments);
        $scope.comments=comments.comments;
        
    });
    
    $scope.dtOptions = DTOptionsBuilder.newOptions().withOption('order', [1, 'asc']).withOption('lengthMenu', [50, 100, 150, 200]);
    
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
         
         for(var i=0;i<$scope.b.hours.length;i++){
            var openHour=(Math.trunc($scope.b.hours[i].open*30/60));
            var closeHour=(Math.trunc($scope.b.hours[i].close*30/60));
            openHour=zeroPad(openHour);
            closeHour=zeroPad(closeHour);
            $scope.b.hours[i].openStr=openHour+'h:'+zeroPad($scope.b.hours[i].open*30%60);
            $scope.b.hours[i].closeStr=closeHour+'h:'+zeroPad($scope.b.hours[i].close*30%60);
        }
         
    });
   
});

function zeroPad(n){
   return n < 10 ? '0'+n : n;
}
