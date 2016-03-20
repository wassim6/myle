'use strict';

MetronicApp.factory('BusinessService',function($resource){
    
    
    var service = {};
		
    service.GetBusiness=GetBusiness;
    service.GetAllBusiness=GetAllBusiness;
    service.AddBusiness=AddBusiness;
    service.AddSubCatToBusiness=AddSubCatToBusiness;
    service.EditBusiness=EditBusiness;
    service.AddImage=AddImage;
    
    return service;
    
    function GetBusiness(){
        return $resource('http://vynd-services.azurewebsites.net/Implementations/BusinessService.svc/:ID',
                         {ID: '@ID'}, 
                         { query: { method: "GET", isArray: true } }
        );
    }

    function GetAllBusiness(){
        return $resource('http://vynd-services.azurewebsites.net/implementations/BusinessService.svc/list/:ID',
                         {ID: '@ID'}, 
                         { query: { method: "GET", isArray: true } }
        );
    }
    
    function AddBusiness(){
        return $resource('http://vynd-services.azurewebsites.net/Implementations/BusinessService.svc/admin/add'
        );
    }
    
    function AddSubCatToBusiness(){
        return $resource('http://vynd-services.azurewebsites.net/Implementations/BusinessService.svc/addsubcategory'
        );
    }
    
    function EditBusiness(){
        return $resource('http://vynd-services.azurewebsites.net/implementations/BusinessService.svc/admin/edit'
        );
    }
    
    function AddImage(){
        return $resource('http://vynd-services.azurewebsites.net/Implementations/BusinessService.svc/:ID/addimage', {ID:'@ID'}
        );
    }
    
    
    
});

