//===Angular application===================================
var app=angular.module('main-app',[]);

app.controller('main-ctl',function($scope, $http){

	//===interact with api===============
	$scope.newcust={};
	$http.get("/api/cust")
		.success(function(data){
			$scope.customers=data;
			console.log($scope.customers);
		})
	$scope.createNew=function(){
		console.log($scope.newcust);
		$http.post("/api/new",$scope.newcust)
		.then(function(data){
			$scope.newcust={};
			$scope.customers=data;
			console.log(data);
		});
;	}
});