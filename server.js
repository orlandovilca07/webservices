/*var express = require('express')
var http = require('http')
var app = express()

app.get('/', (req, res) => {
  res.status(200).send("Welcome to API REST")
})

http.createServer(app).listen(8001, () => {
  console.log('Server started at http://localhost:8001');
});*/
var WebSocketServer = require("ws").Server
var Firestore = require('@google-cloud/firestore');
var http = require("http")
var express = require("express")
var app = express()
var port = process.env.PORT || 8080;
app.use(express.static(__dirname + "/"));
app.use(express.static('static'));
app.get('/', function(req, res) {
    res.json({ status: 'App is running!' });
});
var server = app.listen(port, function () {
    console.log('node.js static server listening on port: ' + port)
});
var wss = new WebSocketServer({server: server});
console.log("websocket server created")
wss.on("connection", function(ws) {
	
	const db = new Firestore({
	  projectId: 'corded-racer-239721',
	  keyFilename: 'Tesis Electricidad-82be67ea28a5.json',
	});
	var dataNueva = setInterval(function() {
		var variacion = (1|-1)*Math.floor(Math.random() * 5)
		var consumo = Math.floor(Math.random() * 51);
		var data = {
			DateConsumption: new Date(),
			IdHouse: "2001",
			PatternConsumption: consumo,
			QuantityHouse: consumo+variacion
		};
		var setDoc = db.collection('Consumption').add(data).then(ref=>{console.log('Nuevo Data')});
		
	}, 20000);
	db.collection('ConsumptionNow').doc('2001').get()
	  .then((doc) => {
	    if (!doc.exists) {
	      console.log('No such document!');
	    } else {
	      console.log('Document data:', doc.data());
	      ws.send(JSON.stringify(doc.data()), function() {});
	    }
	  })
	  .catch((err) => {
	    console.log('Error getting documents', err);
	  });
	console.log("connection ...");

	ws.on("close", function() {
		console.log("websocket connection close");
		clearInterval(dataNueva);
  	});
	ws.on('message', function incoming(message) {
		console.log('received: %s', message);
		//connectedUsers.push(message);
	});
	ws.send('message from server at: ' + new Date());
});
/*var WebSocketServer = require("ws").Server
var http = require("http")
const mongodb = require('mongodb')
var express = require("express")
var app = express()
var port = process.env.PORT || 4005
app.use(express.static(__dirname + "/"));
const server = express()
	.use((req,res)=>res.sendFile('localhost:8080'))//localhost
  .listen(port, () => console.log('Listening on '));
var wss = new WebSocketServer({server: server})
console.log("websocket server created")
wss.on("connection", function(ws) {
	let uri = 'mongodb://heroku_99dkk2x6:hp4p8uavuekgus0cpk5b5epdu@ds229771.mlab.com:29771/heroku_99dkk2x6';
	
	var id = setInterval(function() {
		mongodb.MongoClient.connect(uri, function(err, client) {
			if(err) {
				console.log(err);
			}else{
				console.log('conectado a mongodb');
				var paises = ["AFG","AGO","ALB","ARE","ARG","ARM","AUS","AUT","AZE","BDI","BEL","BEN","BFA","BGD","BGR","BHS","BIH","BLR","BLZ","BOL","BRA","BRN","BTN","BWA","CAF","CAN","CHE","CHL","CHN","CIV","CMR","COD","COG","COL","COM","CRI","CUB","CYP","CZE","DEU","DJI","DNK","DOM","DZA","ECU","EGY","ERI","ESH","ESP","EST","ETH","FIN","FJI","FLK","FRA","GAB","GBR","GEO","GHA","GIN","GLP","GMB","GNB","GNQ","GRC","GTM","GUF","GUY","HND","HRV","HTI","HUN","IDN","IND","IRL","IRN","IRQ","ISL","ISR","ITA","JAM","JOR","JPN","KAZ","KEN","KGZ","KHM","KOR","KSV","KWT","LAO","LBN","LBR","LBY","LKA","LSO","LTU","LUX","LVA","MAR","MDA","MDG","MEX","MKD","MLI","MMR","MNE","MNG","MOZ","MRT","MUS","MWI","MYS","NAM","NCL","NER","NGA","NIC","NLD","NOR","NPL","NZL","OMN","PAK","PAN","PER","PHL","PNG","POL","PRI","PRK","PRT","PRY","QAT","REU","ROU","RUS","RWA","SAU","SDN","SEN","SJM","SLB","SLE","SLV","SOM","SRB","SSD","SUR","SVK","SVN","SWE","SWZ","SYR","TCD","TGO","THA","TJK","TKM","TLS","TTO","TUN","TUR","TZA","UGA","UKR","URY","USA","UZB","VCT","VEN","VIR","VNM","VUT","YEM","ZAF","ZMB","ZWE"];
				var paisAleatorio = Math.round(Math.random()*177)+1;
				console.log(paises[paisAleatorio]+paisAleatorio);
				
			}
			let db = client.db('heroku_99dkk2x6');
			let clima = db.collection('data');
			clima.find({ ISO_3DIGIT : { $eq: paises[paisAleatorio] } }).sort({Jan_Temp:1}).toArray(function (err, docs) {
	        	if(err) {
	        		console.log(err);
	        	}else{
	        		console.log('consulto');
	        		var pais;
	        		docs.forEach(function (doc) {
	        			console.log(doc);
	        			var mensaje = doc
	        			ws.send(JSON.stringify(doc), function() {  })
		          	});
	        	}
	        });
			client.close(function (err) {
	            if(err) {
	              	console.log(err);
	            }else{
	            	console.log('desconectado de mongodb ');
	            }
            });
		});
	}, 5000);
  	console.log("websocket connection open")
  	ws.on("close", function() {
    	console.log("websocket connection close");
    	clearInterval(id);
  	})
  	ws.on("message",function(mes){
  		console.log(JSOgodb.MongoCliN.parse(mes)[0]);
  		monent.connect(uri, function(err, client) {
			if(err) {
				console.log(err);
			}else{
				console.log('conectado a mongodb registro');
				let db = client.db('heroku_99dkk2x6');
				let clima = db.collection('data');
				clima.drop(function (err) {
				    if(err) {
				    	console.log('errordrop');
				    }else{
				    	console.log('borrado');
				    }
				});
				clima.insert(JSON.parse(mes), function(err, result) {
					if(err){
						console.log('errorinsert');
					}else{
						console.log('registrado');
					}
				});
			}
			client.close(function (err) {
	            if(err) {
	              	console.log(err);
	            }else{
	            	console.log('desconectado de mongodb registro');
	            }
            });
			
		});
  	})
})*/
