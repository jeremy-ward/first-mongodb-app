//===server.js=============================================

//===get the tools needed========================
var express=require('express');
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

var port =process.env.PORT||3030;
var app=express();

//==test if mongoDB is connected=================
mongoose.connect('mongodb://localhost/first-db');
var db  = mongoose.connection
db.on("error", console.error.bind(console,'connection error:'));
db.once("open", function(){
	console.log("Connected to DB");
	var mySchema = mongoose.Schema({
		name: String
	});
	var myModel = mongoose.model("myModel", mySchema);
	var jeremy = new myModel({name:"Jeremy"});
	jeremy.save(function(err,jeremy){
		if(err)
				return console.error(err);
		return console.log("You have saved "+jeremy.name);
	});
})

//===set view engin to hogan=====================
app.engine('html', require('hogan-express'));
app.set('view engine', 'html');

app.get("/",function(req,res){
	res.render("index.html",{test:"Hey you guys My name is mud!"});
});


//===start up the application====================
app.listen(port);
console.log("App up on port: "+ port);