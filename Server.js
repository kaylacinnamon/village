var express = require('express');
var app = express();
var router = express.Router();
var path = __dirname + '/views/';
var bodyParser = require('body-parser');
var http = require('http');
var url = require('url');

var fs = require("fs");

router.use(function (req, res, next) {
	console.log('/' + req.method);
	next();
});

router.get('/', function(req, res) {
	res.sendFile(path + 'index.html');
});

// router.get('/host', function(req, res) {
// 	res.sendFile(path + 'host.html');
// });

// router.get('/approval.html', function(req, res){
// 	res.sendFile(path + 'approval.html')
// });

// router.get('/itlp.html', function(req, res){
// 	res.sendFile(path + 'itlp.html')
// });

// router.get('/about', function(req, res) {
// 	res.sendFile(path + 'about.html');
// });

// router.get('/contact', function(req, res) {
// 	res.sendFile(path + 'contact.html');
// });

app.use('/', router);
app.use(bodyParser.json());



app.use(express.static(__dirname + '/scripts'));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/data'));


// app.use('*', function(req, res) {
// 	res.sendFile(path + '404.html');
// });

app.post('/host', function(req, res) {
	var obj = {};
	console.log('body: ' + JSON.stringify(req.body));
	res.send(req.body);
	fs.readFile('data/users.json', 'utf8', function readFileCallback(err, data) {
		if (err) {
			console.log(err);
		}
		else {
			var json = JSON.parse(data);
			json.push(JSON.stringify(req.body));
			fs.writeFile('data/users.json', JSON.stringify(json), function(err) {
				if (err) {
					return console.log(err);
				}
			});
		}
	});
});

app.post('/client', function(req, res) {
	var obj = {};
	console.log('body: ' + JSON.stringify(req.body));
	res.send(req.body);
	fs.readFile('data/users.json', 'utf8', function readFileCallback(err, data) {
		if (err) {
			console.log(err);
		}
		else {
			var json = JSON.parse(data);
			json.push(JSON.stringify(req.body));
			fs.writeFile('data/users.json', JSON.stringify(json), function(err) {
				if (err) {
					return console.log(err);
				}
			});
		}
	});
});

app.post('/host-list', function(req, res) {
	fs.readFile('data/users.json', 'utf8', function readFileCallback(err, data) {
		res.send(data);
	});
});

app.post('/index', function(req, res) {
	fs.readFile('data/users.json', 'utf8', function readFileCallback(err, data) {
		res.send(data);
	});
});

// http.createServer(function(req, res) {
// 	var path = url.parse(req.url).pathname;
// 	if (path == '/host') {
// 		console.log("request received");
// 		var string = 'yaaaaassssss';
// 		res.writeHead(200, {"Content-Type": "text/plain"});
// 		res.end(string);
// 		console.log('string sent');
// 	}
// 	// else {
// 	// 	fs.readFile('views/host-list.html', 'utf8', function(err, file) {
// 	// 		if (err) {
// 	// 			console.log(err);
// 	// 			return;
// 	// 		}
// 	// 		else {
// 	// 			res.writeHead(200, {"Content-Type": "text/html"});
// 	// 			res.end(file, "utf-8");	
// 	// 		}
// 	// 	});
// 	// }
// }).listen(3000);

app.listen(3000, function() {
	console.log('Live at port 3000');
});
