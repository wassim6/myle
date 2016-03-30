'use strict';


MetronicApp.controller('BusinessEditCtrl', function($rootScope, $scope, $http, $timeout, $stateParams,  BusinessService, TagService, uiGmapGoogleMapApi, toaster) {
    
    //Get Busines info
    var businesId = $stateParams.id;
    $scope.businesId=businesId;
    $scope.disable=false;
    
    $scope.categories=[
        {name:"Alimentation"},{name:"Animaux"},{name:"Auto-Motos"},{name:"Artisans"},{name:"Sport"},{name:"Beauté et bien être"},{name:"voyage et loisirs"},{name:"High Tech"},{name:"Enfant et Education"},
        {name:"Mode et Habillement"},{name:"Fourniture Administratifs"},{name:"Maison et Deco"},{name:"Sortie"},{name:"Service"},{name:"Medecin"},{name:"Pharmacie"}
    ];
    $scope.subCategories=TagService.GetAll().query();
    $scope.b=BusinessService.GetById().get({ id:businesId}, function() {
         //console.log($scope.b);
         $scope.name=$scope.b.name;
         $scope.tel=$scope.b.tel;
         $scope.description=$scope.b.description;
         $scope.fax=$scope.b.fax;

         $scope.category={};
         $scope.category.selected={name:$scope.b.category};
         $scope.sousCategory={};
         $scope.sousCategory.selected={name:$scope.b.sousCategory};
    });
    //finish get business info
    
    $scope.editInfo = function(valid){
        if(!valid){
            toaster.error("error", "Please complete all field !");
            return;
        }
        $scope.disable=true;
        
        BusinessService.EditBusinessBasicInfo().save({
                "id":$scope.b._id,
                "description":$scope.description,
                "name":$scope.name,
                "tel":$scope.tel,
                "fax":$scope.fax,
                "category":$scope.category.selected.name,
                "sousCategory":$scope.sousCategory.selected.name
            }, function(){
                toaster.success("success", "Information edited");
                $scope.disable=false;
            }, function(e){
                toaster.error("error", e);
                $scope.disable=false;
            });
        
        
    };
     
    
    
    
    
});