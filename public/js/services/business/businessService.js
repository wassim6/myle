'use strict';

myApp.factory('BusinessService',function($resource, $http){
    
    
    var service = {};
		
    service.GetAll=GetAll;
    service.SearchByTagAndAddress=SearchByTagAndAddress;
    
   
    return service;
    
    function GetAll(){
        return $resource('http://localhost\\:5000/api/tag');
    }
    
    function SearchByTagAndAddress(){
        return $resource('http://localhost\\:5000/api/business/search', {
            save   : {
            method: 'POST',
            params: {},
            format: 'json',
            isArray: true
        }});
    }
    
    
});
