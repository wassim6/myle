'use strict';



MetronicApp.controller('BusinessListCtrl', function($rootScope, $scope, $http, $timeout, BusinessService, DTOptionsBuilder, DTColumnBuilder, toaster) {
            
    
    $scope.finish=false;
    $scope.currentPage = 1;
    $scope.itemsPerPage = 50;
    $scope.categories=[
        {name:"Alimentation"},{name:"Animaux"},{name:"Auto-Motos"},
        {name:"Artisans"},{name:"Sport"},{name:"Beauté et bien être"},
        {name:"voyage et loisirs"},{name:"High Tech"},{name:"Enfant et Education"},
        {name:"Mode et Habillement"},{name:"Fourniture Administratifs"},{name:"Maison et Deco"},
        {name:"Sortie"},{name:"Service"},{name:"Medecin"},{name:"Pharmacie"}
    ];
    $scope.category={};

    /*$scope.list=Business.GetAll().query(function(){
        $scope.finish=false;
        $scope.total=$scope.list.length;
        //console.log($scope.list);
    });*/
    
    $scope.delete = function(bId, i){
          BusinessService.RemoveBusiness().get({
           "id":bId
           }, function(){
               toaster.success("success", "Business removed");
               $scope.list=SanteService.GetAll().query(function(){
                    $scope.finish=false;
                    $scope.total=$scope.list.length;
                    //console.log($scope.list);
                });

           }, function(e){
                 toaster.error("error", e);
       });
    };

    $scope.filterCat = function(valid){
        if(!valid){
            toaster.error("error", "Please select a category !");
            return;
        }
        else{
            $scope.finish=true;
            BusinessService.findAllByCat().save({
                "category":$scope.category.selected.name
            }, function(m){
                $scope.list=m.business;
                $scope.total=$scope.list.length;
                $scope.finish=false;

            }, function(e){
                $scope.finish=false;
                toaster.error('error', e);
            });
        };
    };
    
    
});