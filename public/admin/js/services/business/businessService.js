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
    service.EditProfileImage=EditProfileImage;
    service.EditCoverImage=EditCoverImage;
    service.AddImage=AddImage;
    service.RemoveImage=RemoveImage;
    service.EditInfoView1=EditInfoView1;
    service.EditInfoView2=EditInfoView2;
    service.editInfoView3=editInfoView3;
    service.AddOpeningHourToBusiness=AddOpeningHourToBusiness
    service.RemoveOpeningHourBusiness=RemoveOpeningHourBusiness;
    service.EditOpeningHourToBusiness=EditOpeningHourToBusiness;
    service.findAllByCat=findAllByCat;
    


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
                         {id: '@id'}
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

    function EditProfileImage(){
        return $resource('http://localhost\\:5000/api/business/editprofileimage/:id',
                         {id: '@id'}
         );
    }

    function EditCoverImage(){
        return $resource('http://localhost\\:5000/api/business/editcoverimage/:id',
                         {id: '@id'}
         );
    }

    function AddImage(){
        return $resource('http://localhost\\:5000/api/business/addImage/:id',
                         {id: '@id'}
         );
    }

    function RemoveImage(){
        return $resource('http://localhost\\:5000/api/business/removeImage/:id',
                         {id: '@id'}
         );
    }

    function EditInfoView1(){
        return $resource('http://localhost\\:5000/api/business/editInfoview1/:id',
                         {id: '@id'}
         );
    }

    function EditInfoView2(){
        return $resource('http://localhost\\:5000/api/business/editInfoview2/:id',
                         {id: '@id'}
         );
    }

    function editInfoView3(){
        return $resource('http://localhost\\:5000/api/business/editInfoView3/:id',
                         {id: '@id'}
         );
    }
    
    function AddOpeningHourToBusiness(){
        return $resource('http://localhost\\:5000/api/business/addOpeningHourToBusiness/:id',
                         {id: '@id'}
         );
    }
    function RemoveOpeningHourBusiness(){
        return $resource('http://localhost\\:5000/api/business/removeOpeningHourBusiness/:id',
                         {id: '@id'}
         );
    }
    function EditOpeningHourToBusiness(){
        return $resource('http://localhost\\:5000/api/business/editOpeningHourToBusiness/:id',
                         {id: '@id'}
         );
    }
    
    function findAllByCat(){
        return $resource('http://localhost\\:5000/api/business/findAllByCat'
         );
    }

});

