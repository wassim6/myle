'use strict';



myApp.controller("ChatCtrl", function ($rootScope, $scope, $routeParams, $location, $anchorScroll, $timeout,
        BusinessService, uiGmapGoogleMapApi, toaster, $translate) {

    $scope.lang = "fr";
    $scope.$watch('lang', function (value) {
        $translate.use(value);
    });
    

    $scope.messages = [];
    $scope.username = '';
    if ($rootScope.AuthenticatedUser != null) {
        $scope.username = $rootScope.AuthenticatedUser.firstName;
    }
    $scope.sendMessage = function (message, username) {
        if (message && message !== '' && username) {
            socket.emit('message', message);
            $scope.messages.push({
                'username': username,
                'content': message
            });
        } else {
            toaster.warning("Vous devez vous connecter !");
        }
    };


    var socket = io.connect('http://localhost:8081');

    socket.emit('nouveau_client', $scope.username);
    socket.on('message', function (data) {
        insereMessage(data.pseudo, data.message)
    })


    socket.on('nouveau_client', function (pseudo) {
        if (pseudo && pseudo != '') {
            $scope.messages.push({
                'username': 'Systeme',
                'content': pseudo + ' a rejoint le Chat !'
            });
        }
    })


    function insereMessage(pseudo, message) {
        $scope.$apply(function () {
            $scope.messages.push({
                'username': pseudo,
                'content': message
            });
        });
    }



});




angular.module("irontec.simpleChat").run(["$templateCache", function ($templateCache) {
        $templateCache.put("chatTemplate.html", "<div ng-show=\"visible\" class=\"row chat-window col-xs-5 col-md-3 {{vm.theme}}\" ng-class=\"{minimized: vm.isHidden}\">\r\n    <div class=\"col-xs-12 col-md-12\">\r\n        <div class=\"panel\">\r\n            <div class=\"panel-heading chat-top-bar\">\r\n                <div class=\"col-md-8 col-xs-8\">\r\n                    <h3 class=\"panel-title\">{{vm.title}}</h3>\r\n                </div>\r\n                <div class=\"col-md-4 col-xs-4 window-actions\" style=\"text-align: right;\">\r\n                    <span class=\"fa\" ng-class=\"vm.chatButtonClass\" ng-click=\"vm.toggle()\"></span>\r\n                </div>\r\n            </div>\r\n            <div class=\"panel-body\" ng-style=\"vm.panelStyle\">\r\n                <div class=\"msg-container-base\">\r\n                    <div class=\"row msg-container\" ng-repeat=\"message in vm.messages\" ng-init=\"selfAuthored = vm.myUserId == message.fromUserId\">\r\n                        <div class=\"col-md-12 col-xs-12\">\r\n                            <div class=\"chat-msg\" ng-class=\"{\'chat-msg-sent\': selfAuthored, \'chat-msg-recieved\': !selfAuthored}\">\r\n                                <span class=\"hide\">myUserId:{{vm.myUserId}}</span>\r\n                                <img ng-if=\"message.imageUrl\" class=\"profile\" ng-class=\"{\'pull-right\': selfAuthored, \'pull-left\': !selfAuthored}\" ng-src=\"{{message.imageUrl}}\" />\r\n                                <p>{{message.content}}</p>\r\n                                <div class=\"chat-msg-author\">\r\n                                    <strong>{{message.username}}</strong>&nbsp;\r\n                                    <span class=\"date\">{{message.date|date:hh:mm:a}}</span>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n                <div class=\"chat-bottom-bar\">\r\n                    <form style=\"display:inherit\" ng-submit=\"vm.submitFunction()\">\r\n                        <div class=\"input-group\" >\r\n                            <input type=\"text\" class=\"form-control input-sm chat-input\" placeholder=\"{{vm.inputPlaceholderText}}\" ng-model=\"vm.writingMessage\" />\r\n                        <span class=\"input-group-btn\">\r\n                            <input type=\"submit\" class=\"btn btn-sm chat-submit-button\" value=\"{{vm.submitButtonText}}\" />\r\n                        </span>\r\n                        </div>\r\n                    </form>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n");
    }]);

