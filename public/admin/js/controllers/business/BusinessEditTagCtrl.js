'use strict';


MetronicApp.controller('BusinessEditTagCtrl', function($rootScope, $scope, $http, $timeout, $stateParams,  BusinessService, TagService, toaster) {
    
    //Get Busines info
    var businesId = $stateParams.id;
    
    $scope.b=BusinessService.GetBusiness().get({ ID:businesId}, function() {
    });
    //finish get business info
    
    $scope.tag = {};
    
    var tags = TagService.GetAllTag().get({}, function(){
        $scope.tags=tags.tags; 
    });

    
    $scope.addTag = function(tag){
        
          
    };
    
    
    
});