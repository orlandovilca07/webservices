var WebSocketServer = require("ws").Server
var http = require("http")
var express = require("express")
var app = express()
var port = process.env.PORT || 7003

app.use(express.static(__dirname + "/"))

var server = http.createServer(app)
server.listen(port)

console.log("http server listening on %d", port)

var wss = new WebSocketServer({server: server})
console.log("websocket server created")

wss.on("connection", function(ws) {
	var data = '';
  	var id = setInterval(function() {
		ws.send(JSON.stringify('holi'), function() {  })    	
	}, 1000)
  console.log("websocket connection open")

  ws.on("close", function() {
    console.log("websocket connection close")
    clearInterval(id)
  }).on("data",function(mens){
  		data+=mens;
  }).on('end', function () {
	    // Al terminar de recibir datos los procesamos
	    var response = null;

	    // Nos aseguramos de que sea tipo JSON antes de convertirlo.
	    if (contentType.indexOf('application/json') != -1) {
	        response = JSON.parse(data);
	    }

	    // Invocamos el next con los datos de respuesta
	    next(response, null);
	})
	.on('error', function(err) {
	    // Si hay errores los sacamos por consola
	    console.error('Error al procesar el mensaje: ' + err)
	})
	.on('uncaughtException', function (err) {
	    // Si hay alguna excepción no capturada la sacamos por consola
	    console.error(err);
	});

})
