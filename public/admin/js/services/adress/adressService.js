'use strict';

MetronicApp.factory('AdressService',function($resource){
    
    
    var service = {};
		
    service.GetAllGouvernera=GetAllGouvernera;
    service.GetAllDelegation=GetAllDelegation;
    service.GetAllDelegationName=GetAllDelegationName;

    return service;
    
    function GetAllGouvernera(){
        return $resource('http://localhost\\:5000/api/address/gouvernera/list'
        );
    }
    
    function GetAllDelegation(){
        return $resource('http://localhost\\:5000/api/address/delegation/list'
        );
    }
    
    function GetAllDelegationName(){
        return $resource('http://localhost\\:5000/api/address/delegationname/list'
        );
    }
 
});

