'use strict';

myApp.controller("HomeCtrl" ,function ($rootScope, $scope, TagService, $http, $location, $controller, 
    $route, BusinessService, SearchParam, SearchResult, toaster
) {    
    
    $scope.remoteUrlRequestFn = function(str) {
        return {q: str};
    };

    $scope.Math=Math;
    init();
    
    
    
    $scope.selectedTag={};
    $scope.selectedAddress={};
    $scope.defaultAdress={};
    var adressName=getCookie('adressName');
    if(typeof adressName != 'undefined' &&  adressName != null &&  adressName != '')
        $scope.defaultAdress.name=adressName;
    $scope.defaultTag={};
    if($rootScope.TagSearch!=null)
        $scope.defaultTag.name=$rootScope.TagSearch.name;
    
    $scope.search = function(){
//        console.log($scope.selectedTag);
//        console.log($scope.selectedAddress);
        var address={}, tag={};
        if($scope.selectedAddress==null || Object.getOwnPropertyNames($scope.selectedAddress).length <= 0 || 
           typeof($scope.selectedAddress.description)=='undefined'){
            address={name:'Tunis', type:1, _id:"56e54c183ba5bc24265767ec"};
            address.change=0;
        }
        else{
            address={
                name:$scope.selectedAddress.title, 
                type:$scope.selectedAddress.description.type,
                _id:$scope.selectedAddress.description._id,
                change:1
            };
        }
        tag='';
        if($scope.selectedTag==null || Object.getOwnPropertyNames($scope.selectedTag).length <= 0){
            tag='';
        }
        else{
            if(typeof($scope.selectedTag.description)!='undefined'){
                tag={
                    name:$scope.selectedTag.title,
                    _id:$scope.selectedTag.description._id
                }
            }
        }
        if(tag==''){
            
            tag={
                name:getCookie('tagName'),
                _id:getCookie('tagId')
            }
        }

        if(tag!=''){
            setCookie('tagId', tag._id, 7);
            setCookie('tagName', tag.name, 7);
            $rootScope.TagSearch={id:tag._id, name:tag.name};
        }

        if ($scope.userLat && $scope.userLon && address.change==0 ){
            console.log("cc");
            $http.post('http://localhost:5000/api/business/searchgeo',{
                t:tag,
                lat:$scope.userLat,
                lon:$scope.userLon
            }).success(function(m){
                if(m.length>0){
                    SearchParam.setData({adress:address, tag:tag});
                    SearchResult.setData(m);
                    $location.path("/business/list");
                }       
                else{
                    toaster.warning("Aucun commerce trouver");
                }     
            });
        }
        else{
            setCookie('adressId', address._id ,7 );
            setCookie('adressName',address.name,7 );
            setCookie('adressType',address.type,7 );
            $rootScope.AdressSearch={id:address._id, name:address.name, type:address.type};
            
            $http.post('http://localhost:5000/api/business/search',{
                t:tag,
                a:address
            }).success(function(m){
                //console.log(tag);
                if(m.length>0){
                    SearchParam.setData({adress:address, tag:tag});
                    SearchResult.setData(m);
                    $controller('HeaderCtrl', {$scope: $scope});
                    
                    $location.path("/business/list");
                    //console.log(m); 

                }
                else
                    toaster.warning("Aucun commerce trouver");

        });
        }
        

        
        //console.log(address);
        //console.log(tag);
        
    };
    $scope.limit=3;
    var aId=getCookie('adressId');
    $scope.aName=getCookie('adressName');
    $scope.newsFeed=BusinessService.newsFeed().query({
        id:aId
    }, function(){
        //console.log($scope.newsFeed);
    } );
   
    $scope.plus = function(){
        $scope.limit+=3;
    }

    $scope.newbusiness=BusinessService.newbusiness().query({
        id:aId
    }, function(){
        if($rootScope.AuthenticatedUser!=null){
            for(var i=0;i<$scope.newbusiness.length;i++){
                var test=0;
                for(var j=0;j<$scope.newbusiness[i].likes.length;j++){
                    if($scope.newbusiness[i].likes[j]._id==$rootScope.AuthenticatedUser.id){
                        $scope.newbusiness[i].isLiked=true;
                        test=1;
                    }
                }
                if(test==0)
                    $scope.newbusiness[i].isLiked=false;
            }
        }
    });

    var coupons=BusinessService.getLast4().query({

    }, function(){

        if($rootScope.AuthenticatedUser!=null){
            for(var i=0;i<coupons.length;i++){
                var test=0;
                for(var j=0;j<coupons[i].businessId.likes.length;j++){
                    if(coupons[i].businessId.likes[j]._id==$rootScope.AuthenticatedUser.id){
                        coupons[i].businessId.isLiked=true;
                        test=1;
                    }
                }
                if(test==0)
                    coupons[i].businessId.isLiked=false;
            }
        }
		for(var i=0;i<coupons.length;i++){
			coupons[i].remise=Math.round(coupons[i].remise);
			//coupons[i].remise=20;
		}

        $scope.firstCoupon=coupons[0];
        $scope.secondCoupon=coupons[1];
        $scope.therdCoupon=coupons[2];
        $scope.fourCoupon=coupons[3];


        $('.clock1').countdown(coupons[0].endDate.split('T')[0], function(event) {
            $(this).html(event.strftime('%D jours %H:%M:%S'));
        });
        $('.clock2').countdown(coupons[1].endDate.split('T')[0], function(event) {
            $(this).html(event.strftime('%D jours %H:%M:%S'));
        });
        $('.clock3').countdown(coupons[2].endDate.split('T')[0], function(event) {
            $(this).html(event.strftime('%D jours %H:%M:%S'));
        });
        $('.clock4').countdown(coupons[3].endDate.split('T')[0], function(event) {
            $(this).html(event.strftime('%D jours %H:%M:%S'));
        });

    });



    $scope.like = function(b){
        if($rootScope.AuthenticatedUser==null){
            toaster.warning("Erreur", "Vous devez vous connecter pour donner votre avis");
            return;
        }
        BusinessService.addlike().save({
          id:b._id,
          userId:$rootScope.AuthenticatedUser.id,
        }, function(){
            toaster.success("Succes", "commercer ajouté au favoris")
            b.isLiked=true;
        }, function(e){
            toaster.error("Erreur", "Une erreur est survenu, veillez resseyez ultérierement");
            console.log(e);
        });  
    }

    $scope.unlike = function(b){
        if($rootScope.AuthenticatedUser==null){
            toaster.warning("Erreur", "Vous devez vous connecter pour donner votre avis");
            return;
        }
        BusinessService.removelike().save({
          id:b._id,
          userId:$rootScope.AuthenticatedUser.id,
        }, function(){
            toaster.success("Succes", "commercer retirer des favoris")
            b.isLiked=false;
        }, function(e){
            toaster.error("Erreur", "Une erreur est survenu, veillez resseyez ultérierement");
            console.log(e);
        });  
    }


    
    $scope.touverPosition = function(){
        var options = {
                enableHighAccuracy: true
        };
        navigator.geolocation.getCurrentPosition(function(pos) {
            $http.get("http://maps.googleapis.com/maps/api/geocode/json?latlng="+pos.coords.latitude+","+pos.coords.longitude+"&sensor=true")
            .success(function(s){
                $scope.defaultAdress.name=s.results[1].formatted_address;
                $scope.userLat=pos.coords.latitude;
                $scope.userLon=pos.coords.longitude;
                $scope.$broadcast('angucomplete-alt:changeInput', '16', $scope.defaultAdress);
            })
            
        }, 
            function(error) {                    
                alert('Unable to get location: ' + error.message);
        }, options);        
    };




}).directive('colorbox', function() {
  return {   
    restrict: 'AC',    
    link: function (scope, element, attrs) {        
      $(element).colorbox(attrs.colorbox);     
    }
  };  
});

function init(){

    
    $(document).ready(function() {
        'use strict';

        /**
         * Bootstrap Select
         */
        $('select').selectpicker();

        /**
         * Background image
         */
        $('*[data-background-image]').each(function() {
            $(this).css({
                'background-image': 'url(' + $(this).data('background-image') + ')'
            });
        });

        /**
         * Bootstrap Tooltip
         */
        $(function () {
            $('[data-toggle="tooltip"]').tooltip()
        })

        /**
         * Map
         */
        var map = $('#map');
        var markers = new Array();
        var icons = ['support', 'beer', 'plane', 'flag', 'wifi', 'tint', 'star', 'cutlery', 'music', 'recycle'];

        function get_gps_ranges(center_lat, center_lng, range_level_lat, range_level_lng) {
            var lat = center_lat + (Math.random() * (range_level_lat + range_level_lat) - range_level_lat);
            var lng = center_lng + (Math.random() * (range_level_lng + range_level_lng) - range_level_lng);
            return Array(lat, lng);
        }

        for (var i=0; i < 50; i++) {
            var position = get_gps_ranges(40.761077, -73.983307, 0.08, 0.60);
            var icon = icons[Math.floor(Math.random()*icons.length)];

            markers.push({
                latitude: position[0],
                longitude: position[1],
                marker_content: '<div class="marker"><div class="marker-inner"><i class="fa fa-' + icon + '"></div></div>',
                content: '<div class="infobox"><div class="infobox-inner"><div class="infobox-content"><dl><dt>Address</dt><dd>Evenue Street 800</dd><dt>Phone</dt><dd>+1-123-456-789</dd> <dt>Web</dt><dd><a href="#">http://example.com</a></dd><dt>Rating</dt><dd class="rating"><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i></dd></dl></div><a href="#" class="close"><i class="fa fa-close"></i></a></div>'
            });
        }

        var map_settings = {
            infowindow: {
                borderBottomSpacing: 0,
                height: 195,
                width: 165,
                offsetX: 30,
                offsetY: -120
            },
            cluster: {
                height: 40,
                width: 40,
                gridSize: 60
            },
            zoom: 11,
            transparentMarkerImage: map.data('transparent-marker-image'),
            transparentClusterImage: map.data('transparent-marker-image'),
            markers: markers,
            styles: map.data('styles')
        };

        if (map.length) {
            map.google_map(map_settings);
        }

        var map = $('#fullscreen-map');

        var map_settings = {
            infowindow: {
                borderBottomSpacing: 0,
                height: 195,
                width: 165,
                offsetX: 30,
                offsetY: -120
            },
            cluster: {
                height: 40,
                width: 40,
                gridSize: 60
            },
            zoom: 11,
            transparentMarkerImage: map.data('transparent-marker-image'),
            transparentClusterImage: map.data('transparent-marker-image'),
            markers: markers,
            styles: map.data('styles')
        };

        if (map.length) {
            map.google_map(map_settings);
        }

        /**
         * Colorbox
         */
        $('.detail-gallery-preview a').colorbox({rel:'group3', transition:"none", width:"90%", height:"90%"});

        /**
         * Detail gallery
         */
        if ($('.detail-gallery-index').length != 0) {
            $('.detail-gallery-index').owlCarousel({
                items: 5,
                nav: true,
                dots: true,
                navText: ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>']
            });
        }

        $('.detail-gallery-list-item a').on('click', function(e) {
            e.preventDefault();
            var link = $(this).data('target');
            $('.detail-gallery-preview img').attr('src', link);
            $('.detail-gallery-preview a').attr('href', link);
        });

        /**
         * Listing Detail Map
         */
        var listing_detail_map = $('#listing-detail-map');
        if (listing_detail_map.length) {

            listing_detail_map.google_map({
                center: {
                    latitude: listing_detail_map.data( 'latitude' ),
                    longitude: listing_detail_map.data( 'longitude' )
                },
                zoom: listing_detail_map.data( 'zoom' ),
                transparentMarkerImage: listing_detail_map.data('transparent-marker-image'),
                transparentClusterImage: listing_detail_map.data('transparent-marker-image'),
                infowindow: {
                    borderBottomSpacing: 0,
                    height: 195,
                    width: 165,
                    offsetX: 30,
                    offsetY: -120
                },
                markers: [{
                    latitude: listing_detail_map.data( 'latitude' ),
                    longitude: listing_detail_map.data( 'longitude' ),
                    marker_content: '<div class="marker"><div class="marker-inner"><i class="' + listing_detail_map.data( 'icon' ) + '"></div></div>'
                }]
            });
        }

        /**
         * Listing Detail Street View
         */
        $('#listing-detail-location a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
            var target = $(this).attr('href');

            if (target == '#street-view-panel') {

                var street_view = $('#listing-detail-street-view');

                new google.maps.StreetViewPanorama(document.getElementById('listing-detail-street-view'), {
                        position: {
                            lat: street_view.data( 'latitude' ),
                            lng: street_view.data( 'longitude' )
                        },
                        pov: {
                            heading: street_view.data( 'heading' ),
                            pitch: street_view.data( 'pitch' )
                        },
                        zoom: street_view.data( 'zoom' ),
                        linksControl: false,
                        panControl: false,
                        visible: true
                    }
                );
            }
        });

        /**
         * Listing Detail Bookmark & Like
         */
        $(".detail-banner-btn").click(function(){
            $(this).toggleClass("marked");

            var span = $(this).children("span");
            var toggleText = span.data("toggle");
            span.data("toggle", span.text());
            span.text(toggleText);

        });

        /**
         * Textarea resizer
         */
        $("textarea").after('<div class="textarea-resize"></div>');

        /**
         * Rating form
         */
        $(".input-rating label").hover(function(){
            $(this).siblings("label").toggleClass("hovered");
            $(this).toggleClass("filled");
            $(this).prevAll("label").toggleClass("filled");
        });

        $(".input-rating input").change(function(){
            $(this).siblings().removeClass("marked");
            $(this).prevAll("label").addClass("marked");
        });

        /**
         * Chart
         */
        if ($('#superlist-chart').length !== 0) {
            var counter = 0;
            var increase = Math.PI * 2 / 100;

            var fun1 = [];
            for ( i = 0; i <= 1; i += 0.015 ) {
                var x = i;
                var y = Math.sin( counter );
                fun1.push([x, y]);
                counter += increase;
            }

            var counter = 0;
            var increase = Math.PI * 2 / 100;

            var fun2 = [];
            for ( i = 0; i <= 1; i += 0.015 ) {
                var x = i;
                var y = Math.cos( counter );
                fun2.push([x, y]);
                counter += increase;
            }

            var plot = $.plot($('#superlist-chart'),[
                    {
                        color: '#ceb65f',
                        data: fun1
                    },
                    {
                        color: '#009f8b',
                        data: fun2
                    }
                ],
                {
                    series: {
                        splines: {
                            show: true,
                            tension: 0.24,
                            lineWidth: 3,
                            fill: .40
                        },
                        lines: false,
                        shadowSize: 0
                    },
                    points: { show: true },
                    legend: false,
                    grid: {
                        borderColor: '#f1f1f1',
                        borderWidth: 0
                    },
                    xaxis: {
                        color: '#f1f1f1'
                    },
                    yaxis: {
                        color: '#f1f1f1',
                        min: -1,
                        max: 1
                    }
                });
        }

        /**
         * Input file
         */
        $('#input-file').fileinput({
            initialPreview: [
                "<img src='assets/img/tmp/product-1.jpg' class='file-preview-image' alt='Listing 1' title='Listing 1'>",
                "<img src='assets/img/tmp/product-2.jpg' class='file-preview-image' alt='Listing 2' title='Listing 2'>"
            ],
            overwriteInitial: true,
            initialCaption: "Your Uploaded Images"
        });
    });

}

