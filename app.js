var express = require('express');
var http= require("http");
var baseUrl = "http://murmuring-stream-5595.herokuapp.com/towerOfHanoi/";

var app = express();
app.use(express.static('public'));
app.use('/scripts', express.static(__dirname + '/node_modules/underscore/'));

app.param(function(param, option) {
  return function (req, res, next, val) {
    if (val > option) {
      next();
    }
    else {
      res.sendStatus(403);
    }
  }
});
app.param('id', 1);
app.get('/data/:id', function (req, res) {
	hanoiData = ""
	var url = baseUrl + req.param('id');
	var request = http.get(url, function(response){
		response.on("data", function(chunk){
			hanoiData += chunk;
		});
		response.on("end", function(){
			res.send(hanoiData)
		})
	})
});

var port = process.env.PORT || 5000;
var server = app.listen(port, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
