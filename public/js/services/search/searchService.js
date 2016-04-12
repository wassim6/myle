'use strict';

myApp.factory('SearchParam', function ($rootScope) {

    var data = {
        tag:{},
        adress: {}
    };
    
    var setData = function(newData) {
      data=newData;
    };
    
    var getData = function(){
      return data;
  };

    return {
        setData: setData,
        getData: getData
    };
});

myApp.factory('SearchResult', function ($rootScope) {

    var data = [];
    
    var setData = function(newData) {
      data=newData;
    };
    
    var getData = function(){
      return data;
  };

    return {
        setData: setData,
        getData: getData
    };
});