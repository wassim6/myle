'use strict';

MetronicApp.controller('DashboardController', function($rootScope, $scope, $http, $timeout, BusinessService) {

    var dashboardMainChart=null;
    /*
    var business=BusinessService.GetValidBusiness().get({}, function(){
        var valid =business.business.length;
        business=BusinessService.GetUnValidBusiness().get({}, function(){
            var unvalid=business.business.length;
            if (Morris.EventEmitter) {              
                dashboardMainChart = Morris.Donut({
                    element: 'business_statistics',
                    data: [
                            {label: "Valid", value: valid},
                            {label: "Invalid", value: unvalid}
                          ],
                    colors:['#3980b5', '#b53942']
                    });             
                }
        });
    });*/
    
    var comment=BusinessService.getcommentall().query({ }, function() {
        //console.log(comment);
        $scope.comments=comment;
        $scope.total=comment.length;
        
    });


    var userStats=BusinessService.userstats().query({ }, function(){
        for(var i=0;i<userStats.length;i++){
            userStats[i].day=userStats[i].date.year.toString()+'-'+userStats[i].date.month.toString()+'-'+userStats[i].date.day.toString();
        }
        var dashboardMainChart=null;
        if (Morris.EventEmitter) {              
                dashboardMainChart = Morris.Line({
                    element: 'user_stats',
                    data: userStats,
                    xkey: 'day',
                    ykeys: ['count'],
                    labels: ['Nbr Users'],
                    xLabels:"day"
                });             
        }
    });
    
    /*if (Morris.EventEmitter) {
                // Use Morris.Area instead of Morris.Line
                dashboardMainChart = Morris.Area({
                    element: 'sales_statistics',
                    padding: 0,
                    behaveLikeLine: false,
                    gridEnabled: false,
                    gridLineColor: false,
                    axes: false,
                    fillOpacity: 1,
                    data: [{
                        period: '2011 Q1',
                        sales: 1400,
                        profit: 400
                    }, {
                        period: '2011 Q2',
                        sales: 1100,
                        profit: 600
                    }, {
                        period: '2011 Q3',
                        sales: 1600,
                        profit: 500
                    }, {
                        period: '2011 Q4',
                        sales: 1200,
                        profit: 400
                    }, {
                        period: '2012 Q1',
                        sales: 1550,
                        profit: 800
                    }],
                    lineColors: ['#399a8c', '#92e9dc'],
                    xkey: 'period',
                    ykeys: ['sales', 'profit'],
                    labels: ['Sales', 'Profit'],
                    pointSize: 0,
                    lineWidth: 0,
                    hideHover: 'auto',
                    resize: true
                });
				
				dashboardMainChart = Morris.Line({
                    element: 'sales_statistics2',
                    data: [
					{ year: '2008', value: 20 },
					{ year: '2009', value: 10 },
					{ year: '2010', value: 5 },
					{ year: '2011', value: 5 },
					{ year: '2012', value: 20 }
				  ],
				  // The name of the data record attribute that contains x-values.
				  xkey: 'year',
				  // A list of names of data record attributes that contain y-values.
				  ykeys: ['value'],
				  // Labels for the ykeys -- will be displayed when you hover over the
				  // chart.
				  labels: ['Value']
                });	
            }
    */
});