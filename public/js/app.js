//===Angular application===================================
var app=angular.module('main-app',[]);

app.controller('main-ctl',function($scope, $http){
	$scope.test=[
		{name:"Test"},
		{name: "test2"}
	]
	//===interact with api===============
	$scope.newcust={};
	$http.get("/api/cust")
		.success(function(data){
			$scope.customers=data;
			console.log($scope.customers);
		})
	$scope.createNew=function(){
		$http.post("/api/new",$scope.newcust)
		.success(function(data){
			$scope.newcust={};
			$scope.customers=data;
			console.log($scope.customers);
		});
;	}
});