var app= angular.module("myAppOneSix", ["ngRoute"]);


app.controller('allFixturesController', ['$scope','$http','$routeParams', function($scope,$http,$routeParams){
	$scope.getURL="https://raw.githubusercontent.com/openfootball/football.json/master/2016-17/en.1.json";

	$scope.getAllFixtures15 = function()
	{
		console.log("inside allFixtures15Controller controller");
		

		$http
		({
		        method : "GET",
		        url : $scope.getURL
    	})
    	.then(function mySuccess(response) 
    	{
	    		console.log(response);
	    		$scope.rounds= response.data.rounds;
		}, function myError(response) 
    	{		alert("oops! some error occurred :( ");
    			console.log(response);
    	});	

	}

	$scope.getAllFixtures15();

}]);

app.controller('singleMatchController', ['$scope','$http','$routeParams','$location', function($scope,$http,$routeParams,$location){

	$scope.getURL="https://raw.githubusercontent.com/openfootball/football.json/master/2016-17/en.1.json";

	$scope.goBacktoAllFix = function(){
		$location.path("/allfixtures");
	}
	
	$scope.getSingleMatchDetails15 = function()
	{
		console.log("inside getSingleMatchDetails15 controller");
		$scope.team1=$routeParams.id1;
		$scope.team2=$routeParams.id2;
		$scope.matchDate=$routeParams.id3;

		$scope.team1Name="";
		$scope.team2Name="";
		$scope.team1Goals="";
		$scope.team2Goals="";
		$scope.playDate=$routeParams.id3;
		$scope.winner="";
		$scope.matchDay="";
		
		
		$http
		({
	        method : "GET",
	        url : $scope.getURL
    	})
    	.then(function mySuccess(response) 
    	{
        		console.log(response);
        		$scope.rounds= response.data.rounds;

        		loop1:
        		for(round in $scope.rounds){
        			looop2:
        			for(match in $scope.rounds[round].matches){
        				if($scope.rounds[round].matches[match].team1.code == $scope.team1 && $scope.rounds[round].matches[match].team2.code == $scope.team2 && $scope.rounds[round].matches[match].date == $scope.matchDate){
        					console.log($scope.rounds[round].matches[match].team1.name);
        					$scope.matchDay="It was "+ $scope.rounds[round].name +  " " + "and" + " " ;
        					if($scope.rounds[round].matches[match].score1 > $scope.rounds[round].matches[match].score2 ){
        						$scope.winner="the winner of the match was: " +  $scope.rounds[round].matches[match].team1.name;
        					}
        					else if($scope.rounds[round].matches[match].score1 < $scope.rounds[round].matches[match].score2){
        						$scope.winner="the winner of the match was: " +  $scope.rounds[round].matches[match].team2.name;
        					}
        					else{
        						$scope.winner="the match was a draw!";
        					}
        					$scope.team1Name=$scope.rounds[round].matches[match].team1.name;
        					$scope.team2Name=$scope.rounds[round].matches[match].team2.name;
        					$scope.team1Goals=$scope.rounds[round].matches[match].score1;
        					$scope.team2Goals=$scope.rounds[round].matches[match].score2;
    						break loop1;
        				}
        				else{
        					$scope.team1Name="Details not found";
							$scope.team2Name="Details not found";
							$scope.team1Goals="Details not found";
							$scope.team2Goals="Details not found";
        				}
        			}
        		}
		}, function myError(response) 
    	{		alert("oops! some error occurred :( ");
    			console.log(response);
    	});	

	}

	$scope.getSingleMatchDetails15();
	
}]);

app.controller('teamWiseController', ['$scope','$http','$routeParams', function($scope,$http,$routeParams){
	console.log("inside teamWise15Controller controller");

	$scope.getURL="https://raw.githubusercontent.com/openfootball/football.json/master/2016-17/en.1.json";
	$scope.AllTeams=[];

	$scope.getAllTeams = function(){
		console.log("inside getAllTeams function");
		$http
			({
		        method : "GET",
		        url : $scope.getURL
	    	})
		.then(function mySuccess(response){
				//console.log(response);

				for(i in response.data.rounds[0].matches){
					$scope.AllTeams.push({teamName : response.data.rounds[0].matches[i].team1.name , teamCode: response.data.rounds[0].matches[i].team1.code});
					$scope.AllTeams.push({teamName : response.data.rounds[0].matches[i].team2.name, teamCode: response.data.rounds[0].matches[i].team2.code });
					
				}
				//console.log($scope.AllTeams);

			 }, function myError(response){
			 	alert("oops! some error occurred :( ");
			 	console.log(response);


			 });
	
	
	}
	$scope.getAllTeams();

}]);

app.controller('teamStatsController', ['$scope','$http','$routeParams','$location', function($scope,$http,$routeParams,$location){
	console.log("inside teamStats15Controller controller");

	$scope.getURL="https://raw.githubusercontent.com/openfootball/football.json/master/2016-17/en.1.json";

	$scope.goBacktoChooseTeam = function(){
		$location.path("/teamwise")
	}
	
	$scope.getTeamStats = function(){
		console.log("inside getTeamStats function call");
		$scope.teamCode= $routeParams.teamCode;
		console.log($scope.teamCode);
		
		$scope.teamName="";
		$scope.totalplayed=0;
		$scope.won=0;
		$scope.lost=0;
		$scope.draw=0;
		$scope.totalGoals=0;
		$scope.winPercent;

		$http
			({
		        method : "GET",
		        url : $scope.getURL
	    	})
		.then(function mySuccess(response){
				//console.log(response);

				for(i in response.data.rounds){
					for(j in response.data.rounds[i].matches){
						if(response.data.rounds[i].matches[j].team1.code == $scope.teamCode){
							$scope.teamName=response.data.rounds[i].matches[j].team1.name;
							$scope.totalGoals+=response.data.rounds[i].matches[j].score1;
							$scope.totalplayed++;
							if(response.data.rounds[i].matches[j].score1 > response.data.rounds[i].matches[j].score2){
								$scope.won++;
							}
							else if(response.data.rounds[i].matches[j].score1 < response.data.rounds[i].matches[j].score2){
								$scope.lost++;
							}
							else{
								$scope.draw++;
							}
						}
						else if(response.data.rounds[i].matches[j].team2.code == $scope.teamCode  ){
							$scope.teamName=response.data.rounds[i].matches[j].team2.name;
							$scope.totalplayed++;
							$scope.totalGoals+=response.data.rounds[i].matches[j].score2;
							if(response.data.rounds[i].matches[j].score1 < response.data.rounds[i].matches[j].score2){
								$scope.won++;
							}
							else if(response.data.rounds[i].matches[j].score1 > response.data.rounds[i].matches[j].score2){
								$scope.lost++;
							}
							else{
								$scope.draw++;
							}
						}
					}
				}
				$scope.winPercent= Math.abs((($scope.won/$scope.totalplayed)*100).toFixed(2));

				/*console.log($scope.totalplayed);
				console.log($scope.won);
				console.log($scope.lost);
				console.log($scope.draw);
				console.log($scope.totalGoals);*/

			 }, function myError(response){
			 	alert("oops! some error occurred :( ");
			 	console.log(response);


			 });
	}
	$scope.getTeamStats();

	
}]);



