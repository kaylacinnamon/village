var express = require('express');
var app = express();
var router = express.Router();
var path = __dirname + '/views/';
var bodyParser = require('body-parser');

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


// app.use('*', function(req, res) {
// 	res.sendFile(path + '404.html');
// });

app.post('/host', function(req, res) {
	// res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
	// res.setHeader('Access-Control-Allow-Methods', 'GET');
	// name = req.body.name;
	// res.send(name);
	var obj = {};
	console.log('body: ' + JSON.stringify(req.body));
	res.send(req.body);
	fs.writeFile('data/users.json', JSON.stringify(req.body), function(err) {
		if (err) {
			return console.log(err);
		}
	});
});

app.post('/client', function(req, res) {
	// res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
	// res.setHeader('Access-Control-Allow-Methods', 'GET');
	// name = req.body.name;
	// res.send(name);
	var obj = {};
	console.log('body: ' + JSON.stringify(req.body));
	res.send(req.body);
	fs.writeFile('data/users.json', JSON.stringify(req.body), function(err) {
		if (err) {
			return console.log(err);
		}
	});
});

app.listen(3000, function() {
	console.log('Live at port 3000');
});

// function writeFile(file) {
// 	console.log(file);
// 	var user =  new Object();
// 	user.type = "host";
// 	user.name = "Candice Poon",
// 	user.address = "2150 14th Street, Troy, NY 12180";
// 	user.services = ["water", "food", "electricity"];
// 	user.rating = [20, 8];
// 	user = JSON.stringify(user);
// 	if (file !== '') {
// 		file = file.concat(',');
// 	}
// 	file = file.concat(user);
// 	fs.writeFile('data/users.json', file, function(err) {
// 		if (err) {
// 			return console.log(err);
// 		}
// 	});
// }

// fs.readFile('data/users.json', 'utf8', function readFileCallback(err, data) {
// 	if (err) {
// 		console.log(err);
// 	}
// 	else {
// 		writeFile(data);
// 	}
// });