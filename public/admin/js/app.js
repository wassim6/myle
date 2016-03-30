/***
Metronic AngularJS App Main Script
***/

/* Metronic App */
var MetronicApp = angular.module("MetronicApp", [
    "ui.router", 
    "ui.bootstrap", 
    "oc.lazyLoad",  
    "ngSanitize",
    "ngResource",
    "datatables",
    "angular-confirm",
    "uiGmapgoogle-maps",
    "naif.base64",
    "ui.select",
    "ngAnimate",
    "toaster",
    "angularUtils.directives.dirPagination",
    "xeditable"
]); 

MetronicApp.directive("confirmButton", function($document, $parse) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      var buttonId, html, message, nope, title, yep;
      
      buttonId = Math.floor(Math.random() * 10000000000);
      
      attrs.buttonId = buttonId;
      
      message = attrs.message || "Are you sure?";
      yep = attrs.yes || "Yes";
      nope = attrs.no || "No";
      title = attrs.title || "Confirm";
      
      html = "<div id=\"button-" + buttonId + "\">\n  <span class=\"confirmbutton-msg\">" + message + "</span><br>\n	<button class=\"confirmbutton-yes btn btn-danger\">" + yep + "</button>\n	<button class=\"confirmbutton-no btn\">" + nope + "</button>\n</div>";
      
      element.popover({
        content: html,
        html: true,
        trigger: "manual",
        title: title,
        placement:"left"
      });
      
      return element.bind('click', function(e) {
        var dontBubble, pop;
        dontBubble = true;
        
        e.stopPropagation();
        
        element.popover('show');
        
        pop = $("#button-" + buttonId);
        
        pop.closest(".popover").click(function(e) {
          if (dontBubble) {
            e.stopPropagation();
          }
        });
        
        pop.find('.confirmbutton-yes').click(function(e) {
          dontBubble = false;
          
          var func = $parse(attrs.confirmButton);
          func(scope);
        });
        
        pop.find('.confirmbutton-no').click(function(e) {
          dontBubble = false;
          
          $document.off('click.confirmbutton.' + buttonId);
          
          element.popover('hide');
        });
        
        $document.on('click.confirmbutton.' + buttonId, ":not(.popover, .popover *)", function() {
          $document.off('click.confirmbutton.' + buttonId);
          element.popover('hide');
        });
      });
    }
  };
});


MetronicApp.value('AuthenticatedUser',{});

MetronicApp.run(function ($rootScope, $state, $location, $resource) {
  $rootScope.$on('$stateChangeSuccess', function (event, next) {
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
            $state.go('login');
            $location.path("/login");
        }
        else{
             var r=$resource('http://localhost\\:5000/api/admin/auth');
            r.save({
                "mail":user,
                "pass":userp
            }, function(response){

                $rootScope.AuthenticatedUser = {
                    id : response._id,
                    firstName:response.firstName,
                    lastName:response.lastName,
                    mail:response.mail
                };
                var today = new Date();
                var expired = new Date(today);
                expired.setDate(today.getHours() + 2); //Set expired date to tomorrow
                setCookie('user',user,expired);
                setCookie('userp',userp,expired);
            }, function(e){
                $state.go('login');
                $location.path("/login");
            }
            );
        
        }   
      }
      
  });
})


MetronicApp.run(function(editableOptions) {
  editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
});

/* Configure ocLazyLoader(refer: https://github.com/ocombe/ocLazyLoad) */
MetronicApp.config(['$ocLazyLoadProvider', function($ocLazyLoadProvider) {
    $ocLazyLoadProvider.config({
        // global configs go here
    });
}]);

//AngularJS v1.3.x workaround for old style controller declarition in HTML
MetronicApp.config(['$controllerProvider', function($controllerProvider) {
  // this option might be handy for migrating old apps, but please don't use it
  // in new ones!
  $controllerProvider.allowGlobals();
}]);

MetronicApp.factory('settings', ['$rootScope', function($rootScope) {
    // supported languages
    var settings = {
        layout: {
            pageSidebarClosed: false, // sidebar menu state
            pageBodySolid: false, // solid body color state
            pageAutoScrollOnLoad: 1000 // auto scroll to top on page load
        },
        layoutImgPath: Metronic.getAssetsPath() + 'admin/layout/img/',
        layoutCssPath: Metronic.getAssetsPath() + 'admin/layout/css/'
    };

    $rootScope.settings = settings;

    return settings;
}]);

/* Setup App Main Controller */
MetronicApp.controller('AppController', ['$scope', '$rootScope', function($scope, $rootScope) {
    $scope.$on('$viewContentLoaded', function() {
        Metronic.initComponents(); // init core components
        
    });
	
	//$scope.headerShow=true;
	
}]);


/* Setup Layout Part - Header */
MetronicApp.controller('HeaderController', ['$scope', '$http','$rootScope','$state', '$stateParams', '$location' ,function($scope, $http,$rootScope,$state, $stateParams, $location) {
    $scope.$on('$includeContentLoaded', function() {
        Layout.initHeader(); // init header
    });
    
    $scope.logOut = function(){
      $rootScope.AuthenticatedUser =null;
      setCookie('user',null,null);
      setCookie('userp',null,null);
      $state.go('login');
      $location.path("/login");   
    };
    
}]);

/* Setup Layout Part - Sidebar */
MetronicApp.controller('SidebarController', ['$scope', function($scope) {
    $scope.$on('$includeContentLoaded', function() {
        Layout.initSidebar(); // init sidebar
    });
}]);




/* Setup Layout Part - Footer */
MetronicApp.controller('FooterController', ['$scope', function($scope) {
    $scope.$on('$includeContentLoaded', function() {
        Layout.initFooter(); // init footer
    });
}]);

MetronicApp.controller('ExportCtrl', ['$scope', function($scope) {
    $scope.export = function(type, ignoreColumn){
        $('#myTable').tableExport({type:type,escape:'false', ignoreColumn:'['+ignoreColumn+']', pdfFontSize:8
});
    };

}]);


/* Init global settings and run the app */
MetronicApp.run(["$rootScope", "settings", "$state", function($rootScope, settings, $state) {
    $rootScope.$state = $state; // state to be accessed from view
}]);





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