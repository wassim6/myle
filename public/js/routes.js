'use strict';


myApp.config(function($routeProvider, $locationProvider) {

    
    $routeProvider.when(
    	'/home', 
    	{
    		templateUrl: 'partials/home.html', 
    		controller: 'HomeCtrl',
            activetab: 'Home'
    	}).when(
        '/business/requestAdd',
        {
            templateUrl: 'partials/business/requestForAdd.html',
            controller: 'RequestAddCtrl',
            activetab: 'Home'
        }).when(
        '/business/list',
        {
            templateUrl: 'partials/business/list.html',
            controller: 'ListCtrl',
            activetab: 'Home'
        }).when(
        '/business/info/:id',
        {
            templateUrl: 'partials/business/info.html',
            controller: 'InfoCtrl',
            activetab: 'Home'
        }).when(
        '/user/profile',
        {
            templateUrl: 'partials/user/profile.html',
            controller: 'ProfileCtrl',
            activetab: 'Home'
        }).when(
        '/user/seting',
        {
            templateUrl: 'partials/user/seting.html',
            controller: 'SetingCtrl',
            activetab: 'Home'
        }).when(
        '/login/sign_up',
        {
            templateUrl: 'partials/login/signup.html',
            controller: 'SigninCtrl',
            activetab: 'Home'
        }).when(
        '/login/sign_up2',
        {
            templateUrl: 'partials/login/signup2.html',
            controller: 'SigninCtrl2',
            activetab: 'Home'
        }).when(
        '/login/sign_in',
        {
            templateUrl: 'partials/login/signin.html',
            controller: 'SigninCtrl',
            activetab: 'Home'
        }).when(
        '/login/forgot_password',
        {
            templateUrl: 'partials/login/forgot_password.html',
            controller: 'ForgotPasswordCtrl',
            activetab: 'Home'
        })


        ;

    $routeProvider.otherwise(
        {
            redirectTo: '/home'
        });
});

