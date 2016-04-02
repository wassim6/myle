'use strict';

myApp.factory('SearchParam', function () {

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

myApp.factory('SearchResult', function () {

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