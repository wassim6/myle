'use strict';

myApp.controller("InfoCtrl" ,function ($rootScope, $scope, $routeParams, $location, $anchorScroll, $timeout, 
    BusinessService, uiGmapGoogleMapApi, toaster, $uibModal) {

    var businessId=$routeParams.id;
    var userId='0';
    if( typeof ($rootScope.AuthenticatedUser)!='undefined' && $rootScope.AuthenticatedUser!=null)
        userId=$rootScope.AuthenticatedUser.id;
    $scope.myModel={};
    $scope.Math=Math;

    var b=BusinessService.getById().get({
        id:businessId
    }, function(){
        if( typeof(b.profileImage)=='undefined')
            b.profileImage='default.png';
        if( typeof(b.sousCategory)=='undefined')
            b.sousCategory='sante';
        for(var i=0;i<b.openingTime.length;i++){
            if(b.openingTime[i].tested!=1){
                if(b.openingTime[i].dayNumber==0){
                    b.openingTime[i].dayStr="Lundi";
                }
                else if(b.openingTime[i].dayNumber==1){
                    b.openingTime[i].dayStr="Mardi";
                }
                else if(b.openingTime[i].dayNumber==2){
                    b.openingTime[i].dayStr="Mercredi";
                }
                else if(b.openingTime[i].dayNumber==3){
                    b.openingTime[i].dayStr="Jeudi";
                }
                else if(b.openingTime[i].dayNumber==4){
                    b.openingTime[i].dayStr="Vendredi";
                }
                else if(b.openingTime[i].dayNumber==5){
                    b.openingTime[i].dayStr="Samedi";
                }
                else if(b.openingTime[i].dayNumber==6){
                    b.openingTime[i].dayStr="Dimanche";
                }
                if(b.openingTime[i].open==0){
                    b.openingTime[i].result="Férmer";
                }
                else{
                    if(b.openingTime[i].openingHour==null)
                        b.openingTime[i].result='-';
                    else{
                            var openHour=(Math.trunc(b.openingTime[i].openingHour*30/60));
                            var closeHour=(Math.trunc(b.openingTime[i].closingHour*30/60));
                            openHour=zeroPad(openHour);
                            closeHour=zeroPad(closeHour);
                            b.openingTime[i].openStr = openHour+'h:' + zeroPad(b.openingTime[i].openingHour*30%60);
                            b.openingTime[i].closeStr = closeHour + 'h:'+ zeroPad(b.openingTime[i].closingHour*30%60);
                            b.openingTime[i].result=  'de '+b.openingTime[i].openStr  +' à '+b.openingTime[i].closeStr
                            for(var j=0;j<b.openingTime.length;j++){
                                if(b.openingTime[j].tested==1 || j==i){

                                }
                                else{
                                    if(b.openingTime[j].dayNumber==b.openingTime[i].dayNumber){
                                b.openingTime[j].tested=1;
                                var openHour=(Math.trunc(b.openingTime[j].openingHour*30/60));
                                var closeHour=(Math.trunc(b.openingTime[j].closingHour*30/60));
                                openHour=zeroPad(openHour);
                                closeHour=zeroPad(closeHour);
                                b.openingTime[j].openStr = openHour+'h:' + zeroPad(b.openingTime[j].openingHour*30%60);
                                b.openingTime[j].closeStr = closeHour + 'h:'+ zeroPad(b.openingTime[j].closingHour*30%60);
                                b.openingTime[i].result+= ' et de '+ b.openingTime[j].openStr  +' à '+b.openingTime[j].closeStr


                                    }
                                }
                            }



                    }
                }
            }else{}
        }
        b.isLiked=false;
        for(var i=0;i<b.likes.length;i++){
            if(b.likes[i]._id==userId){
                b.isLiked=true;
            }
        }
        var mapS=false;
        if(b.latitude!=0 && b.longitude!=0) mapS=true;
        b.mapS=mapS;
        $scope.b=b;
        //console.log($scope.b);
        $timeout(function() {
            $(".group3").colorbox({rel:"imgs", transition:"elastic"});

            if ($('.detail-gallery-index').length != 0) {
            $('.detail-gallery-index').owlCarousel({
                items: 5,
                nav: true,
                dots: true,
                navText: ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>']
            });
        }
        $('.detail-gallery-list-item a').on('click', function(e) {
            e.preventDefault();
            var link = $(this).data('target');
            $('.detail-gallery-preview img').attr('src', link);
            $('.detail-gallery-preview a').attr('href', link);
        });
        }, 100);
        $scope.map= {center: {latitude: $scope.b.latitude, longitude: $scope.b.longitude }, zoom: 10 };
        $scope.options = {scrollwheel: true};
        $scope.coordsUpdates = 0;
        $scope.dynamicMoveCtr = 0;
        $scope.marker = {
          id: 0,
          coords: {
            latitude:  $scope.b.latitude,
            longitude:  $scope.b.longitude
          }
          
        };
    }, function(){

    });

    $scope.comments = BusinessService.findCommentsByBusiness().query({
        bid:businessId
    }, function(){
        //console.log($scope.comments);
    })

    $scope.writeReview = function(){
        $location.hash('writeReview');
        $anchorScroll();        
    }

    $scope.viewReview = function(){
        $location.hash('viewReview');
        $anchorScroll();        
    }
    
    
    $scope.addReview = function(img){
        if($rootScope.AuthenticatedUser==null){
            toaster.warning("Erreur", "Vous devez vous connecter pour donner votre avis");
            return;
        }
        if(typeof $scope.rate=='undefined'){
            toaster.error("Erreur", "Veuillez saisir une note");
            return;
        }
        if(typeof $scope.content=='undefined' || $scope.content.length<3){
            toaster.error("Erreur", "Veuillez donner votre avis");
            return;
        }
        if(typeof img.length=='undefined')
            img=[];
        BusinessService.addComment().save({
          content:$scope.content,
          rate:$scope.rate,
          businessId:businessId,
          userId:$rootScope.AuthenticatedUser.id,
          imgs:img
        }, function(){
            toaster.success("Succes", "Votre avis a été enregistré")
            $scope.b.comments= BusinessService.findCommentsByBusiness().query({
                bid:businessId
            }, function(cc){
                $scope.b.comments=cc;
                $scope.applyif();
                
            });
        }, function(e){
            toaster.error("Erreur", "Une erreur est survenu, veillez resseyez ultérierement");
            console.log(e);
        });
    };
    
    $scope.applyif=function()
                {
                    if(!$scope.$$phase) {
                        $scope.$apply();
                    }else
                    {
                        setTimeout(function(){$scope.applyif();},10);
                    }
                }

    $scope.like = function(){
        if($rootScope.AuthenticatedUser==null){
            toaster.warning("Erreur", "Vous devez vous connecter pour donner votre avis");
            return;
        }
        BusinessService.addlike().save({
          id:businessId,
          userId:$rootScope.AuthenticatedUser.id,
        }, function(){
            toaster.success("Succes", "commercer ajouté au favoris")
            $scope.b.isLiked=true;
        }, function(e){
            toaster.error("Erreur", "Une erreur est survenu, veillez resseyez ultérierement");
            console.log(e);
        });  
    }

    $scope.unlike = function(){
        if($rootScope.AuthenticatedUser==null){
            toaster.warning("Erreur", "Vous devez vous connecter pour donner votre avis");
            return;
        }
        BusinessService.removelike().save({
          id:businessId,
          userId:$rootScope.AuthenticatedUser.id,
        }, function(){
            toaster.success("Succes", "commercer retirer des favoris")
            $scope.b.isLiked=false;
        }, function(e){
            toaster.error("Erreur", "Une erreur est survenu, veillez resseyez ultérierement");
            console.log(e);
        });  
    }


    $scope.appointment = function (op,size) {
        var modalInstance = $uibModal.open({
          templateUrl: 'myModalContent.html',
          controller: 'ModalInstanceCtrl',
          size: size,
          resolve: {
            items: function () {
              return op;
            }
          }
        });
    };


})

.directive("owlCarousel", function() {
    return {
        restrict: 'E',
        transclude: false,
        link: function (scope) {
            scope.initCarousel = function(element) {
              // provide any default options you want
                var defaultOptions = {
                };
                var customOptions = scope.$eval($(element).attr('data-options'));
                // combine the two options objects
                for(var key in customOptions) {
                    defaultOptions[key] = customOptions[key];
                }
                // init carousel
                $(element).owlCarousel(defaultOptions);
            };
        }
    };
})
.directive('owlCarouselItem', [function() {
    return {
        restrict: 'A',
        transclude: false,
        link: function(scope, element) {
          // wait for the last item in the ng-repeat then call init
            if(scope.$last) {
                scope.initCarousel(element.parent());
            }
        }
    };
}]).directive('colorbox', function() {
  return {   
    restrict: 'AC',    
    link: function (scope, element, attrs) {        
      $(element).colorbox(attrs.colorbox);     
    }
  };  
});


function zeroPad(n){
   return n < 10 ? '0'+n : n;
}


myApp.controller("ModalInstanceCtrl" ,function ($rootScope, $scope, $uibModalInstance, items, toaster, BusinessService) {

  $scope.today = function() {
    $scope.dt = new Date();
  };
  $scope.today();

  $scope.clear = function() {
    $scope.dt = null;
  };

  $scope.dateOptions = {
    formatYear: 'yy',
    maxDate: new Date(2020, 5, 22),
    minDate: new Date(),
    startingDay: 1
  };

  $scope.popup1 = {
    opened: false
  };
  $scope.open1 = function() {
    $scope.popup1.opened = true;
  };



  $scope.setDate = function(year, month, day) {
    $scope.dt = new Date(year, month, day);
  };

  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];
  
    $scope.items = items;
    //console.log(items);
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.rdv= function(form){
        if(!form){
            toaster.error("error", "Completer tout les champs");
            return;
        }
        if($rootScope.AuthenticatedUser==null){
            toaster.warning("Erreur", "Vous devez vous connecter pour reserver");
            return;
        }
        BusinessService.rdv().save({
            id:items._id,
            userId:$rootScope.AuthenticatedUser.id,
            date:$scope.dt,
            heure:$scope.heure
        }, function(){
            toaster.success("Rdv effectuer avec succes ");
        }, function(e){
            console.log(e);
            toaster.error("Erreur, !!");

        });

        console.log($scope.dt);
        console.log($scope.heure);

    }


});




