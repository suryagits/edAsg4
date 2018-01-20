app.config(['$routeProvider',function($routeProvider) {
	$routeProvider
	.when("/allfixtures", {
		templateUrl:"templates15/allFixtures.html",
		controller: "allFixturesController"
		
	})
	.when("/singlematches", {
		templateUrl:"templates15/singleMatches.html",
		controller: "singleMatchController"
	})
	.when("/singlematches/:id1/:id2/:id3", {
		templateUrl:"templates15/singleMatches.html",
		controller: "singleMatchController"
	})
	.when("/teamwise",{
		templateUrl:"templates15/chooseUrTeam.html",
		controller: "teamWiseController"
	})
	.when("/teamStats/:teamCode",{
		templateUrl:"templates15/teamStats.html",
		controller: "teamStatsController"
	})
	.otherwise({redirectTo:'/'});
	
}]);