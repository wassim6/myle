'use strict';

myApp.factory('BusinessService',function($resource, $http){
    
    
    var service = {};
		
    service.GetAll=GetAll;
    service.SearchByTagAndAddress=SearchByTagAndAddress;
    service.getById=getById;
    service.addComment=addComment;
    service.findCommentsByBusiness=findCommentsByBusiness;
    service.addlike=addlike;
    service.removelike=removelike;
    service.newsFeed=newsFeed;
    service.newbusiness=newbusiness;
    service.getLast4=getLast4;
    service.rdv=rdv;
   
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
    function findCommentsByBusiness(){
         return $resource('http://localhost\\:5000/api/business/findcommentsbybusiness/:bid',
                    {bid:'@bid'});   
    }
    
    function addlike(){
         return $resource('http://localhost\\:5000/api/business/addlike/:id',
                    {id:'@id'});   
    }
    function removelike(){
         return $resource('http://localhost\\:5000/api/business/removelike/:id',
                    {id:'@id'});   
    }
    function newsFeed(){
         return $resource('http://localhost\\:5000/api/newsfeed/:id',
                    {id:'@id'});   
    }
    function newbusiness(){
         return $resource('http://localhost\\:5000/api/newbusiness/:id',
                    {id:'@id'});   
    }
    function getLast4(){
        return $resource('http://localhost\\:5000/api/coupon/getLast4'); 
    }

    function rdv(){
        return $resource('http://localhost\\:5000/api//business/rdv/:id',
            {id:'@id'}); 
    }


function rdvRes(){
        return $resource('http://localhost\\:5000/api//business/rdvRes/:id',
            {id:'@id'}); 
    }

    
});
