'use strict';

myApp.controller("HeaderCtrl" ,function ($rootScope, $scope, $window,  TagService, $http, $location, BusinessService, SearchParam, SearchResult
) {
    
    $scope.remoteUrlRequestFn = function(str) {
        return {q: str};
    };
   


    $scope.selectedTag={};
    $scope.selectedAddress={};


    $scope.defaultAdress={};
    var adressName=getCookie('adressName');
    if(typeof adressName != 'undefined' &&  adressName != null &&  adressName != '')
        $scope.defaultAdress.name=adressName;
    

    $scope.defaultTag={};
    if($rootScope.TagSearch!=null)
        $scope.defaultTag.name=$rootScope.TagSearch.name;

    /*$scope.service = SearchParam;
    $scope.$watch('service.getData()', function(newVal) {
        if(typeof(newVal.adress.name)!='undefined'){
            console.log(newVal);
            $scope.defaultAdress={};
            $scope.defaultAdress.name=newVal.adress.name;
            $scope.defaultTag={};
            $scope.defaultTag.name=newVal.tag.name;            
        }
    });*/
    
    $scope.search = function(){

//        console.log($scope.selectedTag);
//        console.log($scope.selectedAddress);
        var address={}, tag={};
        if($scope.selectedAddress==null || Object.getOwnPropertyNames($scope.selectedAddress).length <= 0 || 
           typeof($scope.selectedAddress.description)=='undefined'){
            address={name:'Tunis', type:1, _id:"56e54c183ba5bc24265767ec"};
        }
        else{
            address={
                name:$scope.selectedAddress.title, 
                type:$scope.selectedAddress.description.type,
                _id:$scope.selectedAddress.description._id
            };
        }
        tag='';
        if($scope.selectedTag==null || Object.getOwnPropertyNames($scope.selectedTag).length <= 0){
            tag='';
        }
        else{
            if(typeof($scope.selectedTag.description)!='undefined'){
                tag={
                    name:$scope.selectedTag.title,
                    _id:$scope.selectedTag.description._id
                }
            }
        }
        if(tag==''){
            
            tag={
                name:getCookie('tagName'),
                _id:getCookie('tagId')
            }
        }
        setCookie('adressId', address._id ,7 );
        setCookie('adressName',address.name,7 );
        setCookie('adressType',address.type,7 );
        $rootScope.AdressSearch={id:address._id, name:address.name, type:address.type};
        if(tag!=''){
            setCookie('tagId', tag._id, 7);
            setCookie('tagName', tag.name, 7);
            $rootScope.TagSearch={id:tag._id, name:tag.name};
        }
        $http.post('http://localhost:5000/api/business/search',{
            t:tag,
            a:address
        }).success(function(m){
            if(m.length>0){
                SearchParam.setData({adress:address, tag:tag});
                SearchResult.setData(m);
                $location.path("/business/list");
            }


        });
        

        
        //console.log(address);
        //console.log(tag);

        
    };    
    
    
    
    
    $scope.logOut = function(){
      $rootScope.AuthenticatedUser =null;
      setCookie('user',null,null);
      setCookie('userp',null,null);
      $location.path("/home");     
    };
    
    
});

