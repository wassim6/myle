'use strict';

MetronicApp.factory('TagService',function($resource){
    
    
    var service = {};
		
    service.GetAll=GetAll;
    service.GetById=GetById;
    
   
    return service;
    
    function GetAll(){
        return $resource('http://localhost\\:5000/api/tag');
    }
    
    function GetById(){
        return $resource('http://localhost\\:5000/api/tag/:id', {id:'@id'});
    }
    
    
});
