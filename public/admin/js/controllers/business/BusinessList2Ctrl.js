'use strict';



MetronicApp.controller('BusinessList2Ctrl', function($rootScope, $scope, $http, $timeout, BusinessService, DTOptionsBuilder, DTColumnBuilder, toaster, $modal, CommentService) {
            
    
    $scope.finish=true;
    //toaster.success("success", "Business added");
    //toaster.error("error", e);
    
    
    $scope.business=BusinessService.GetAllBusinessMinimal().get({ }, function() {
       //console.log($scope.business.business);
        $scope.finish=false;
    });
    
    $scope.dtOptions = DTOptionsBuilder.newOptions().withOption('order', [1, 'asc']).withOption('lengthMenu', [50, 100, 150, 200]);
//desc    
    
    
    
    $scope.delete = function(id, index){
        //console.log(id+'  '+index);
        
        BusinessService.RemoveBusiness().get({
            ID:id
        }, function(){
            $scope.business.business.splice(index, 1);
             toaster.success("success", "Business deleted");
        }, function(e){
            toaster.error("error", e);
        });

    };

    
    
   
    

    $scope.open = function (id,size) {
            
            var commentList = CommentService.GetCommentByBusiness().get({ID:id, UID:0}, function(){
                //console.log(commentList.comments);
                var modalInstance = $modal.open({
                  templateUrl: 'myModalContent.html',
                  controller: 'ModalInstanceCtrl',
                  size: size,
                  resolve: {
                    items: function () {
                      return commentList.comments;
                    }
                  }
                });
                
            });

		    

		   
	  	};


    
    
});

 function ModalInstanceCtrl($scope, $modalInstance, items, CommentService, toaster) {
    $scope.items = items;
    $scope.ok = function () { };
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
     
     $scope.deleteComment = function(c){
       CommentService.DeleteComment().get({
            "ID":c.id
          } , function(){
                var items2 =CommentService.GetCommentByBusiness().get({ID:c.businessID, UID:0}, function(){
                    $scope.items=items2.comments;
                    if (!$scope.$$phase) $scope.$apply()
                    
 
                });
              toaster.success("success", "Comment deleted");
          }, function(e){
                toaster.error("error", e);
          });
   };
     
     
}