//===server.js=============================================

//===get the tools needed========================
var express=require('express');
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var morgan = require("morgan");
var methodOverride =require('method-override');
var port =process.env.PORT||3030;
var app=express();

app.use(express.static(__dirname+"/public"));

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.json({type:'application/vnd.api+json'}));
app.use(methodOverride());

//==test if mongoDB is connected=================
mongoose.connect('mongodb://localhost/first-db');
var db  = mongoose.connection
db.on("error", console.error.bind(console,'connection error:'));
db.once("open", function(){
	console.log("Connected to DB");});
	//==define needed schemas=================
	var clientsSchema = mongoose.Schema({
		name: String,
		contact:{
			phone: String,
			address: String
		}
	});
	var Clients = mongoose.model('Clients',clientsSchema);

//===set view engin to ejs=====================
app.set('view engine', 'ejs');

//===set up the app routes=======================
app.get("/",function(req,res){
	res.render("index.ejs");
});

//===api methods=================================

//==get all customers in database======
app.get("/api/cust",function(req,res){
	Clients.find(function(err,clients){
		if(err)
			res.send(err);
		res.json(clients);
	});
});

//==post to database===================
app.post("/api/new", function(req,res){
	Clients.create({
		name:req.body.name,
		contact:{
			phone: req.body.contact.phone,
			address: req.body.contact.address
		}
	}, function(err,clients){
			if(err)
				res.send(err)
			Clients.find(function(err,clients){
				if(err)
					res.send(err);
				res.json(clients);
			});
		});
});


//===start up the application====================
app.listen(port);
console.log("App up on port: "+ port);