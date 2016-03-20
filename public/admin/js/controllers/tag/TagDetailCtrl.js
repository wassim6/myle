'use strict';

MetronicApp.controller('TagDetailCtrl', function($rootScope, $scope, $http, $timeout, $stateParams, TagService, $location) {
    
    $scope.tag={};
    var id=$stateParams.id;
     var tags=TagService.GetAllTag().get({}, function() {
         tags=tags.tags;
         for(var i = 0; i < tags.length; i++) {
                if(tags[i].Id == id) {
                    $scope.tag=tags[i];
                }
         }
     });
    
    
    
    
    
    $scope.delete= function(c){
        TagService.DeleteTag().save({
            "Id":c.Id
        }, function(){
            $location.path("/tag/list");
        })
    };
    
    
});