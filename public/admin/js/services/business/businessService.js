'use strict';

MetronicApp.factory('BusinessService',function($resource, urlService){
    
    
    var service = {};
		
    service.GetBusiness=GetBusiness;
    service.GetAllBusiness=GetAllBusiness;
    service.GetAllBusinessMinimal=GetAllBusinessMinimal;
    service.AddBusiness=AddBusiness;
    service.AddSubCatToBusiness=AddSubCatToBusiness;
    service.EditBusiness=EditBusiness;
    service.AddImage=AddImage;
    service.GetValidBusiness=GetValidBusiness;
    service.GetUnValidBusiness=GetUnValidBusiness;
    service.RemoveBusiness=RemoveBusiness;
    
    service.DeletePhotoBusiness=DeletePhotoBusiness;
    service.GetPhotosBusiness=GetPhotosBusiness;
    
    service.GetAllBusinessMinimalWithModerator=GetAllBusinessMinimalWithModerator;
    
    service.EditAditionalInfo=EditAditionalInfo;
    service.AddTagToBusiness=AddTagToBusiness;
    service.RemoveTagFromBusiness=RemoveTagFromBusiness;
    service.RemoveSubCatFromBusiness=RemoveSubCatFromBusiness;
    
    service.AddOpeningDay=AddOpeningDay;
    service.RemoveOpeningDay=RemoveOpeningDay;
    service.EditOpeningDay=EditOpeningDay;

    return service;
    
    function GetBusiness(){
        return $resource(urlService+'/Implementations/BusinessService.svc/:ID',
                         {ID: '@ID'}, 
                         { query: { method: "GET", isArray: true } }
        );
    }

    function GetAllBusiness(){
        return $resource(urlService+'/implementations/BusinessService.svc/list/:ID',
                         {ID: '@ID'}, 
                         { query: { method: "GET", isArray: true } }
        );
    }
    
    function GetAllBusinessMinimal(){
        return $resource(urlService+'/Implementations/AdminService.svc/business/list'
        );
    }
    
    function AddBusiness(){
        return $resource(urlService+'/Implementations/BusinessService.svc/admin/add'
        );
    }
    
    function AddSubCatToBusiness(){
        return $resource(urlService+'/Implementations/BusinessService.svc/addsubcategory'
        );
    }
    
    function EditBusiness(){
        return $resource(urlService+'/implementations/BusinessService.svc/admin/edit'
        );
    }
    
    function AddImage(){
        return $resource(urlService+'/Implementations/BusinessService.svc/:ID/addimage', {ID:'@ID'}
        );
    }
    
    function GetValidBusiness(){
        return $resource(urlService+'/Implementations/AdminService.svc/business/valid'
        );
    }
    function GetUnValidBusiness(){
        return $resource(urlService+'/Implementations/AdminService.svc/business/unvalid'
        );
    }
    function RemoveBusiness(){
        return $resource(urlService+'/Implementations/AdminService.svc/business/:ID/remove',
                         {ID:'@ID'}
        );
    }
    
    
    
    function DeletePhotoBusiness(){
        return $resource(urlService+'/implementations/AdminService.svc/business/photo/:ID/remove',
                         {ID:'@ID'}
        );
        
    }
    
    function GetPhotosBusiness(){
        return $resource(urlService+'/implementations/AdminService.svc/business/photos/list');
    }
    
    function GetAllBusinessMinimalWithModerator(){
        return $resource(urlService+'/implementations/AdminService.svc/business/listwithmoderator');
    }
    
    function EditAditionalInfo(){
        return $resource(urlService+'/Implementations/BusinessService.svc/editaditionalinfo/:ID',
                         {ID:'@ID'}
        );
    }
    
    function AddTagToBusiness(){
        return $resource(urlService+'/Implementations/BusinessService.svc/addtag');
    }
    function RemoveTagFromBusiness(){
        return $resource(urlService+'/Implementations/BusinessService.svc/removetag');
    }
    function RemoveSubCatFromBusiness(){
        return $resource(urlService+'/Implementations/BusinessService.svc/removesubcategory');
    }
    function AddOpeningDay(){
        return $resource(urlService+'/Implementations/OpeningHoursService.svc/openingDay/add');
    }
    function RemoveOpeningDay(){
        return $resource(urlService+'/Implementations/OpeningHoursService.svc/openingDay/delete/:OPID',
                         {OPID:'@OPID'});
    }
    function EditOpeningDay(){
        return $resource(urlService+'/Implementations/OpeningHoursService.svc/openingDay/edit');
    }
    


    
    
    
});

