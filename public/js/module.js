'use strict';

var myApp = angular.module('myApp', ['ngRoute', 'pretty-checkable', 'ngResource', 'angucomplete-alt',
	'angularUtils.directives.dirPagination',
    'uiGmapgoogle-maps',
    'angular-media-preview',
    'naif.base64',
    "ngAnimate",
    "toaster"                                     
]);

myApp.value('AdressSearch',{});
myApp.value('TagSearch',{});
myApp.value('AuthenticatedUser',{});

myApp.run(function($rootScope) {
	//{_id:"56e54c193ba5bc24265767f2", name:"Bizerte", type:1}
	var adressId=getCookie('adressId');
	var adressName=getCookie('adressName');
	var adressType=getCookie('adressType');

	var tagId=getCookie("tagId");
	var tagName = getCookie("tagName");

    if(typeof adressId == 'undefined' ||  adressId == null ||  adressId == ''||
       typeof adressName == 'undefined' ||  adressName == null ||  adressName == ''||
       typeof adressType == 'undefined' ||  adressType == null ||  adressType == ''){
        setCookie('adressId','56e54c183ba5bc24265767ec',7 );
    	setCookie('adressName','Tunis',7 );
    	setCookie('adressType',1,7 );
    }
    if(typeof tagId == 'undefined' ||  tagId == null ||  tagId == ''||
       typeof tagName == 'undefined' ||  tagName == null ||  tagName == ''){
       	$rootScope.TagSearch=null;
    }
    else{
    	$rootScope.TagSearch={id:tagId, name:tagName};
    }
    $rootScope.AdressSearch={id:adressId, name:adressName, type:adressType};
});

myApp.run(function ($rootScope, $location, loginService) {
  $rootScope.$on('$routeChangeStart', function (event, next) {
      if ($rootScope.AuthenticatedUser!= null) {
          //$state.go('login');
          //$location.path("/login");
      }
      else{
        var user=getCookie('user');
        var userp=getCookie('userp');
        if(typeof user == 'undefined' ||  user == null ||  user == '' ||
           typeof userp == 'undefined' ||  userp == null ||  userp == ''){
            $rootScope.AuthenticatedUser=null;     
            if(next.templateUrl =="partials/user/profile.html" || 
              next.templateUrl =="partials/user/seting.html"){
                $location.path("/login/sign_in");
            }
            else{
            }
        }
        else{
            loginService.authetificationUser().save({
                "username":user,
                "password":userp
            }, function(response){
                loginService.getbyusername().get({
                    username:response.username 
                }, function(m){                
                    $rootScope.AuthenticatedUser = {
                        username:response.username,
                        password:response.password,
                        id:m._id    
                    };
                    var today = new Date();
                    var expired = new Date(today);
                    expired.setDate(today.getHours() + 2); //Set expired date to tomorrow
                    setCookie('user',user,expired);
                    setCookie('useri',m._id,expired);
                    setCookie('userp',userp,expired);
                }, function(e){
                    console.log(e);
                });
                
            }, function(e){
                setCookie('user',null, null);
                setCookie('userp',null, null);
                if(next.templateUrl =="partials/user/profile.html" || 
                  next.templateUrl =="partials/user/seting.html"){
                    $location.path("/login/sign_in");
                }
                else{
                }
                //$location.path("/login/sign_in");
            }
            );
        }

      }
      
  });
})





function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}