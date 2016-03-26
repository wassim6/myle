'use strict';

MetronicApp.controller('SanteScrape2Ctrl', function($rootScope, $scope, $http, $timeout, SanteService) {
    
    $scope.finish=false;
    $scope.disable=false;

    
    
    $scope.scrape = function(){
        //console.log(s+'  '+e);
        $scope.finish=true;
        $scope.disable=true;
        SanteService.Scrape().query({
            
        },function(){
            $scope.finish=false;
            $scope.disable=false;
        }, function(){
            $scope.finish=false;
            $scope.disable=false;
        });
    };
    
});