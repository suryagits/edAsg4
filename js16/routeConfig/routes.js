app.config(['$routeProvider',function($routeProvider) {
	$routeProvider
	.when("/allfixtures", {
		templateUrl:"templates16/allFixtures.html",
		controller: "allFixturesController"
		
	})
	.when("/singlematches", {
		templateUrl:"templates16/singleMatches.html",
		controller: "singleMatchController"
	})
	.when("/singlematches/:id1/:id2/:id3", {
		templateUrl:"templates16/singleMatches.html",
		controller: "singleMatchController"
	})
	.when("/teamwise",{
		templateUrl:"templates16/chooseUrTeam.html",
		controller: "teamWiseController"
	})
	.when("/teamStats/:teamCode",{
		templateUrl:"templates16/teamStats.html",
		controller: "teamStatsController"
	})
	.otherwise({redirectTo:'/'});
	
}]);