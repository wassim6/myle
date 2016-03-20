'use strict';

MetronicApp.factory('RestaurantService',function($resource){
    
    
    var service = {};
		

    service.GetAllRestaurant=GetAllRestaurant;
    service.Scrape=Scrape;

    
    return service;


    function GetAllRestaurant(){
        return $resource('http://localhost\\:5000/api/restaurant/list'
        );
    }
    
    function Scrape(){
        return $resource('http://localhost\\:5000/api/restaurant/scrape'
        );
    }

    
    
});

