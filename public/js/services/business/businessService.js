'use strict';

myApp.factory('BusinessService',function($resource, $http){
    
    
    var service = {};
		
    service.GetAll=GetAll;
    service.SearchByTagAndAddress=SearchByTagAndAddress;
    service.getById=getById;
    service.addComment=addComment;
   
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

    function getById(){
        return $resource('http://localhost\\:5000/api/business/:id', 
                {id:'@id'});
    }
    
    function addComment(){
        return $resource('http://localhost\\:5000/api/business/addComment');
    }
    
    
});
