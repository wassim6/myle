/* Setup Rounting For All Pages */
MetronicApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    // Redirect any unmatched url
    $urlRouterProvider.otherwise("/login");  
    
    $stateProvider

        // Dashboard
        .state('dashboard', {
            url: "/dashboard.html",
            templateUrl: "views/dashboard.html",            
            data: {pageTitle: 'Admin Dashboard Template'},
            controller: "DashboardController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            

                            'assets/admin/pages/scripts/index3.js',

                             'js/controllers/DashboardController.js'
                        ] 
                    });
                }]
            }
        })
    
        
        .state('business/list', {
                url: "/business/list",
                templateUrl: "views/business/list.html",
                data: {pageTitle: 'Business List'},
                controller: "BusinessListCtrl",
                resolve: {
                    deps: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'MetronicApp',
                            insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                            files: [
'assets/global/plugins/select2/select2.css', 'assets/global/plugins/datatables/plugins/bootstrap/dataTables.bootstrap.css', 'assets/global/plugins/datatables/extensions/Scroller/css/dataTables.scroller.min.css', 'assets/global/plugins/datatables/extensions/ColReorder/css/dataTables.colReorder.min.css',
'assets/global/plugins/select2/select2.min.js',
'assets/global/plugins/datatables/all.min.js',
'js/scripts/table-advanced.js',

'js/services/business/businessService.js',
'js/controllers/business/BusinessListCtrl.js'
                                
                            ]
                        });
                    }]
                }
            })
        .state('business/list2', {
                url: "/business/list2",
                templateUrl: "views/business/list2.html",
                data: {pageTitle: 'Business List'},
                controller: "BusinessListCtrl",
                resolve: {
                    deps: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'MetronicApp',
                            insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                            files: [
'assets/global/plugins/select2/select2.css', 'assets/global/plugins/datatables/plugins/bootstrap/dataTables.bootstrap.css', 'assets/global/plugins/datatables/extensions/Scroller/css/dataTables.scroller.min.css', 'assets/global/plugins/datatables/extensions/ColReorder/css/dataTables.colReorder.min.css',
'assets/global/plugins/select2/select2.min.js',
'assets/global/plugins/datatables/all.min.js',
'js/scripts/table-advanced.js',

'js/services/business/businessService.js',
'js/controllers/business/BusinessList2Ctrl.js'
                                
                            ]
                        });
                    }]
                }
            })
        .state('business/add', {
                url: "/business/add",
                templateUrl: "views/business/add.html",
                data: {pageTitle: 'Business Add'},
                controller: "BusinessAddCtrl",
                resolve: {
                    deps: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'MetronicApp',
                            insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                            files: [
'assets/global/plugins/select2/select2.css',                             
'assets/global/plugins/datatables/plugins/bootstrap/dataTables.bootstrap.css', 
'assets/global/plugins/datatables/extensions/Scroller/css/dataTables.scroller.min.css',
'assets/global/plugins/datatables/extensions/ColReorder/css/dataTables.colReorder.min.css',

'assets/global/plugins/select2/select2.min.js',
'assets/global/plugins/datatables/all.min.js',
'js/scripts/table-advanced.js',


'js/services/business/businessService.js',
'js/controllers/business/BusinessAddCtrl.js'
                                
                            ]
                        });
                    }]
                }
            })
        .state('business/add2', {
                url: "/business/add2",
                templateUrl: "views/business/add2.html",
                data: {pageTitle: 'Business Add'},
                controller: "BusinessAdd2Ctrl",
                resolve: {
                    deps: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'MetronicApp',
                            insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                            files: [
'assets/global/plugins/select2/select2.css',                             
'assets/global/plugins/datatables/plugins/bootstrap/dataTables.bootstrap.css', 
'assets/global/plugins/datatables/extensions/Scroller/css/dataTables.scroller.min.css',
'assets/global/plugins/datatables/extensions/ColReorder/css/dataTables.colReorder.min.css',

'assets/global/plugins/select2/select2.min.js',
'assets/global/plugins/datatables/all.min.js',
'js/scripts/table-advanced.js',


'js/services/business/businessService.js',
'js/controllers/business/BusinessAdd2Ctrl.js'
                                
                            ]
                        });
                    }]
                }
            })
        .state('business/edit/:id', {
                url: "/business/edit/:id",
                templateUrl: "views/business/edit.html",
                data: {pageTitle: 'Business edit'},
                controller: "BusinessEditCtrl",
                resolve: {
                    deps: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'MetronicApp',
                            insertBefore: '#ng_load_plugins_before',
                            files: [           
                                'js/services/tag/tagService.js',
                                'js/services/business/businessService.js',
                                'js/controllers/business/BusinessEditCtrl.js'
                            ]
                        });
                    }]
                }
            })
        .state('business/editcat/:id', {
                url: "/business/editcat/:id",
                templateUrl: "views/business/editcat.html",
                data: {pageTitle: 'Business edit Categories'},
                controller: "BusinessEditCatCtrl",
                resolve: {
                    deps: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'MetronicApp',
                            insertBefore: '#ng_load_plugins_before',
                            files: [           
                                'js/services/tag/tagService.js',
                                'js/services/business/businessService.js',
                                'js/controllers/business/BusinessEditCatCtrl.js'
                            ]
                        });
                    }]
                }
            })
        .state('business/edittag/:id', {
                    url: "/business/edittag/:id",
                    templateUrl: "views/business/edittag.html",
                    data: {pageTitle: 'Business edit Tag'},
                    controller: "BusinessEditTagCtrl",
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'MetronicApp',
                                insertBefore: '#ng_load_plugins_before',
                                files: [           
                                    'js/services/tag/tagService.js',
                                    'js/services/business/businessService.js',
                                    'js/controllers/business/BusinessEditTagCtrl.js'
                                ]
                            });
                        }]
                    }
                })
        .state('business/editadresse/:id', {
                    url: "/business/editadresse/:id",
                    templateUrl: "views/business/editadresse.html",
                    data: {pageTitle: 'Business edit Adresse'},
                    controller: "BusinessEditAdresseCtrl",
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'MetronicApp',
                                insertBefore: '#ng_load_plugins_before',
                                files: [           
                                    'js/services/tag/tagService.js',
                                    'js/services/business/businessService.js',
                                    'js/controllers/business/BusinessEditAdresseCtrl.js'
                                ]
                            });
                        }]
                    }
                })
        .state('business/editimage/:id', {
                    url: "/business/editimage/:id",
                    templateUrl: "views/business/editimage.html",
                    data: {pageTitle: 'Business edit Image'},
                    controller: "BusinessEditImageCtrl",
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'MetronicApp',
                                insertBefore: '#ng_load_plugins_before',
                                files: [           
                                    'js/services/tag/tagService.js',
                                    'js/services/business/businessService.js',
                                    'js/controllers/business/BusinessEditImageCtrl.js'
                                ]
                            });
                        }]
                    }
                })
        .state('business/editinformation/:id', {
                    url: "/business/editinformation/:id",
                    templateUrl: "views/business/editinformation.html",
                    data: {pageTitle: 'Business edit information'},
                    controller: "BusinessEditInformationCtrl",
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'MetronicApp',
                                insertBefore: '#ng_load_plugins_before',
                                files: [           
                                    'js/services/business/businessService.js',
                                    'js/controllers/business/BusinessEditInformationCtrl.js'

                                ]
                            });
                        }]
                    }
                })
    
        .state('business/detail/:id', {
                url: "/business/detail/:id",
                templateUrl: "views/business/detail.html",
                data: {pageTitle: 'Business detail'},
                controller: "BusinessDetailCtrl",
                resolve: {
                    deps: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'MetronicApp',
                            insertBefore: '#ng_load_plugins_before',
                            files: [           
                                'js/services/tag/tagService.js',
                                'js/services/business/businessService.js',
                                'js/controllers/business/BusinessDetailCtrl.js'
                            ]
                        });
                    }]
                }
            })
    
    
    
        .state('sante/list', {
                url: "/sante/list",
                templateUrl: "views/sante/list.html",
                data: {pageTitle: 'Sante List'},
                controller: "SanteListCtrl",
                resolve: {
                    deps: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'MetronicApp',
                            insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                            files: [
'assets/global/plugins/select2/select2.css', 'assets/global/plugins/datatables/plugins/bootstrap/dataTables.bootstrap.css', 'assets/global/plugins/datatables/extensions/Scroller/css/dataTables.scroller.min.css', 'assets/global/plugins/datatables/extensions/ColReorder/css/dataTables.colReorder.min.css',
'assets/global/plugins/select2/select2.min.js',
'assets/global/plugins/datatables/all.min.js',
'js/scripts/table-advanced.js',

'js/services/sante/santeService.js',
'js/controllers/sante/SanteListCtrl.js'
                                
                            ]
                        });
                    }]
                }
            })
        .state('sante/scrape', {
                url: "/sante/scrape",
                templateUrl: "views/sante/scrape.html",
                data: {pageTitle: 'Sante scrape'},
                controller: "SanteScrapeCtrl",
                resolve: {
                    deps: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'MetronicApp',
                            insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                            files: [
'assets/global/plugins/select2/select2.css', 'assets/global/plugins/datatables/plugins/bootstrap/dataTables.bootstrap.css', 'assets/global/plugins/datatables/extensions/Scroller/css/dataTables.scroller.min.css', 'assets/global/plugins/datatables/extensions/ColReorder/css/dataTables.colReorder.min.css',
'assets/global/plugins/select2/select2.min.js',
'assets/global/plugins/datatables/all.min.js',
'js/scripts/table-advanced.js',

'js/services/sante/santeService.js',
'js/controllers/sante/SanteScrapeCtrl.js'
                                
                            ]
                        });
                    }]
                }
            })
        .state('sante/scrape2', {
                url: "/sante/scrape2",
                templateUrl: "views/sante/scrape2.html",
                data: {pageTitle: 'Sante scrape'},
                controller: "SanteScrape2Ctrl",
                resolve: {
                    deps: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'MetronicApp',
                            insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                            files: [
'assets/global/plugins/select2/select2.css', 'assets/global/plugins/datatables/plugins/bootstrap/dataTables.bootstrap.css', 'assets/global/plugins/datatables/extensions/Scroller/css/dataTables.scroller.min.css', 'assets/global/plugins/datatables/extensions/ColReorder/css/dataTables.colReorder.min.css',
'assets/global/plugins/select2/select2.min.js',
'assets/global/plugins/datatables/all.min.js',
'js/scripts/table-advanced.js',

'js/services/sante/santeService.js',
'js/controllers/sante/SanteScrape2Ctrl.js'
                                
                            ]
                        });
                    }]
                }
            })
    
    
        .state('restaurant/list', {
                url: "/restaurant/list",
                templateUrl: "views/restaurant/list.html",
                data: {pageTitle: 'restaurant List'},
                controller: "RestaurantListCtrl",
                resolve: {
                    deps: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'MetronicApp',
                            insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                            files: [
'assets/global/plugins/select2/select2.css', 'assets/global/plugins/datatables/plugins/bootstrap/dataTables.bootstrap.css', 'assets/global/plugins/datatables/extensions/Scroller/css/dataTables.scroller.min.css', 'assets/global/plugins/datatables/extensions/ColReorder/css/dataTables.colReorder.min.css',
'assets/global/plugins/select2/select2.min.js',
'assets/global/plugins/datatables/all.min.js',
'js/scripts/table-advanced.js',

'js/services/restaurant/restaurantService.js',
'js/controllers/restaurant/RestaurantListCtrl.js'
                                
                            ]
                        });
                    }]
                }
            })
        .state('restaurant/scrape', {
                url: "/restaurant/scrape",
                templateUrl: "views/restaurant/scrape.html",
                data: {pageTitle: 'restaurant scrape'},
                controller: "RestaurantScrapeCtrl",
                resolve: {
                    deps: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'MetronicApp',
                            insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                            files: [
'assets/global/plugins/select2/select2.css', 'assets/global/plugins/datatables/plugins/bootstrap/dataTables.bootstrap.css', 'assets/global/plugins/datatables/extensions/Scroller/css/dataTables.scroller.min.css', 'assets/global/plugins/datatables/extensions/ColReorder/css/dataTables.colReorder.min.css',
'assets/global/plugins/select2/select2.min.js',
'assets/global/plugins/datatables/all.min.js',
'js/scripts/table-advanced.js',

'js/services/restaurant/restaurantService.js',
'js/controllers/restaurant/RestaurantScrapeCtrl.js'
                                
                            ]
                        });
                    }]
                }
            })
    
    
    
    
    
    
    
    
    
    
        .state('tag/list', {
                        url: "/tag/list",
                        templateUrl: "views/tag/list.html",
                        data: {pageTitle: 'tag list'},
                        controller: "TagListCtrl",
                        resolve: {
                            deps: ['$ocLazyLoad', function($ocLazyLoad) {
                                return $ocLazyLoad.load({
                                    name: 'MetronicApp',
                                    insertBefore: '#ng_load_plugins_before',
                                    files: [
                                        'js/services/tag/tagService.js',
                                        'js/controllers/tag/TagListCtrl.js'

                                    ]
                                });
                            }]
                        }
                    })
        .state('tag/add', {
                    url: "/tag/add",
                    templateUrl: "views/tag/add.html",
                    data: {pageTitle: 'tag add'},
                    controller: "TagAddCtrl",
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'MetronicApp',
                                insertBefore: '#ng_load_plugins_before',
                                files: [
                                    'js/services/tag/tagService.js',
                                    'js/controllers/tag/TagAddCtrl.js'

                                ]
                            });
                        }]
                    }
                })
        .state('tag/detail/:id', {
                    url: "/tag/detail/:id",
                    templateUrl: "views/tag/detail.html",
                    data: {pageTitle: 'tag detail'},
                    controller: "TagDetailCtrl",
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'MetronicApp',
                                insertBefore: '#ng_load_plugins_before',
                                files: [
                                    'js/services/tag/tagService.js',
                                    'js/controllers/tag/TagDetailCtrl.js'

                                ]
                            });
                        }]
                    }
                })
        .state('tag/edit/:id', {
                    url: "/tag/edit/:id",
                    templateUrl: "views/tag/edit.html",
                    data: {pageTitle: 'subcat edit'},
                    controller: "TagEditCtrl",
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'MetronicApp',
                                insertBefore: '#ng_load_plugins_before',
                                files: [
                                    'js/services/tag/tagService.js',
                                    'js/controllers/tag/TagEditCtrl.js'


                                ]
                            });
                        }]
                    }
                })
        
      
        .state('login', {
                url: "/login",
                templateUrl: "views/login.html",
                data: {pageTitle: 'Login'},
                controller: "LoginCtrl",
                resolve: {
                    deps: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'MetronicApp',
                            insertBefore: '#ng_load_plugins_before',
                            files: [
                                'js/services/loginService.js',
                                'js/controllers/LoginCtrl.js'


                            ]
                        });
                    }]
                }
            })
    

}]);

