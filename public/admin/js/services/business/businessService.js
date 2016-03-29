'use strict';

MetronicApp.factory('BusinessService',function($resource){
    
    
    var service = {};
		
    service.GetById=GetById;
    service.AddBusiness=AddBusiness;
    service.EditBusinessBasicInfo=EditBusinessBasicInfo;
    service.EditAdress=EditAdress;
    service.RemoveBusiness=RemoveBusiness;
    service.AddTagToBusiness=AddTagToBusiness;
    service.RemoveTagFromBusiness=RemoveTagFromBusiness;
    
//    service.AddImage=AddImage;
//    service.GetValidBusiness=GetValidBusiness;
//    service.GetUnValidBusiness=GetUnValidBusiness;
//    service.DeletePhotoBusiness=DeletePhotoBusiness;
//    service.GetPhotosBusiness=GetPhotosBusiness;
    
//    service.GetAllBusinessMinimalWithModerator=GetAllBusinessMinimalWithModerator;
    
/*    service.EditAditionalInfo=EditAditionalInfo;
    service.RemoveSubCatFromBusiness=RemoveSubCatFromBusiness;
    service.AddOpeningDay=AddOpeningDay;
    service.RemoveOpeningDay=RemoveOpeningDay;
    service.EditOpeningDay=EditOpeningDay;*/

    return service;
    
    function GetById(){
        return $resource('http://localhost\\:5000/api/business/:id',
                         {id: '@id'}, 
                         { query: { method: "GET", isArray: true } }
        );
    }

    function AddBusiness(){
        return $resource('http://localhost\\:5000/api/business/add'
        );
    }
    
    function EditBusinessBasicInfo(){
        return $resource('http://localhost\\:5000/api/business/editbasic/:id',
                         {id: '@id'}
        );
    }
    
    function RemoveBusiness(){
        return $resource('http://localhost\\:5000/api/business/remove/:id',
                         {id: '@id'}
        );
    }
    
    function AddTagToBusiness(){
        return $resource('http://localhost\\:5000/api/business/addtag/:id',
                         {id: '@id'}
         );
    }
    
    function RemoveTagFromBusiness(){
        return $resource('http://localhost\\:5000/api/business/removetag/:id',
                         {id: '@id'}
         );
    }
    
    function EditAdress(){
        return $resource('http://localhost\\:5000/api/business/editadress/:id',
                         {id: '@id'}
         );
    }
    
});

