var WebSocketServer = require("wss").Server
var http = require("http")
const mongodb = require('mongodb')
var express = require("express")
var app = express()
var port = process.env.PORT || 3000


app.use(express.static(__dirname + "/"))

var server = http.createServer(app)
server.listen(port)

console.log("http server listening on %d", port)

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
})