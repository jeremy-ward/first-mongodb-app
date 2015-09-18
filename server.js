//===server.js=============================================

//===get the tools needed========================
var express=require('express');
var bodyParser = require("body-parser");

var port =process.env.PORT||3030;
var app=express();

//===set view engin to hogan=====================
app.engine('html', require('hogan-express'));
app.set('view engine', 'html');

app.get("/",function(req,res){
	res.render("index.html",{test:"Hey you guys!"});
});


//===start up the application====================
app.listen(port);
console.log("App up on port: "+ port);