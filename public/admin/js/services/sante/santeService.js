'use strict';

MetronicApp.factory('SanteService',function($resource){
    
    
    var service = {};
		
    
    service.GetAll=GetAll;
    service.Scrape=Scrape;
   
    return service;
    

    
    function GetAll(){
        return $resource('http://localhost\\:5000/api/sante');
    }
    
    
    function Scrape(){
        return $resource('http://localhost\\:5000/api/sante/scrape');
    }
    

    
    
});
