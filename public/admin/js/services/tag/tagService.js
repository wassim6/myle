'use strict';

MetronicApp.factory('TagService',function($resource){
    
    
    var service = {};
		
    service.GetAll=GetAll;
    service.GetById=GetById;
    
    service.AddTag=AddTag;
    service.EditTag=EditTag;
    service.RemoveTag=RemoveTag;
    
   
    return service;
    
    function GetAll(){
        return $resource('http://localhost\\:5000/api/tag');
    }
    
    function GetById(){
        return $resource('http://localhost\\:5000/api/tag/:id', {id:'@id'});
    }
    
    function AddTag(){
        return $resource('http://localhost\\:5000/api/tag/add');
    }
    function EditTag(){
        return $resource('http://localhost\\:5000/api/tag/edit');
    }
    function RemoveTag(){
        return $resource('http://localhost\\:5000/api/tag/remove/:_id', {_id:'@_id'});
    }
    
    
});
