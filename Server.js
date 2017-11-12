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

app.put('/update-host', function(req, res) {
	var obj = {};
	res.send(req.body);
	var json;
	// console.log('here');
	fs.readFile('data/users.json', 'utf8', function readFileCallback(err, data) {
		json = data;
		updateHost();
	});
	function updateHost() {
		console.log(req.body);
		json = JSON.parse(json);
		console.log(json);
		for (var i = 0; i < json.length; ++i) {
			var jsonObj = JSON.parse(json[i]);
			if (req.body.id == jsonObj.id && req.body.type == 'host') {
				console.log(req.body.rating);
				jsonObj.address = req.body.address;
				jsonObj.city = req.body.city;
				jsonObj.state = req.body.state;
				jsonObj.zip = req.body.zip;
				jsonObj.phone = req.body.phone;
				jsonObj.squareCash = req.body.squareCash;
				jsonObj.rating = req.body.rating;
				jsonObj.services = req.body.services;
				json[i] = JSON.stringify(jsonObj);
				console.log("\nPOSTING JSON: ");
				console.log(json);
				fs.writeFile('data/users.json', JSON.stringify(json), function(err) {
					if (err) {
						return console.log(err);
					}
				});
				break;
			}
		}
	}	
});

app.put('/update-client', function(req, res) {
	var obj = {};
	res.send(req.body);
	var json;
	fs.readFile('data/users.json', 'utf8', function readFileCallback(err, data) {
		json = data;
		updateClient();
	});
	function updateClient() {
		json = JSON.parse(json);
		for (var i = 0; i < json.length; ++i) {
			var jsonObj = JSON.parse(json[i]);
			if (req.body.id == jsonObj.id && req.body.type == 'client') {
				jsonObj.phone = req.body.phone;
				jsonObj.services = req.body.services;
				json[i] = JSON.stringify(jsonObj);
				fs.writeFile('data/users.json', JSON.stringify(json), function(err) {
					if (err) {
						return console.log(err);
					}
				});
				break;
			}
		}
	}	
});

app.put('/update-TU-rating', function(req, res) {
	var obj = {};
	res.send(req.body);
	var json;
	fs.readFile('data/users.json', 'utf8', function readFileCallback(err, data) {
		json = data;
		console.log(json);
		updateTURating();
	});
	function updateTURating() {
		json = JSON.parse(json);
		for (var i = 0; i < json.length; ++i) {
			var jsonObj = JSON.parse(json[i]);
			console.log(req.body.id + '\n');
			console.log(jsonObj.id);
			if (req.body.id == jsonObj.id && req.body.type == 'host') {
				jsonObj.rating = req.body.rating;
				json[i] = JSON.stringify(jsonObj);
				fs.writeFile('data/users.json', JSON.stringify(json), function(err) {
					if (err) {
						return console.log(err);
					}
				});
				break;
			}
		}
	}	
});

app.put('/update-TD-rating', function(req, res) {
	var obj = {};
	res.send(req.body);
	var json;
	fs.readFile('data/users.json', 'utf8', function readFileCallback(err, data) {
		json = data;
		console.log(json);
		updateTDRating();
	});
	function updateTDRating() {
		json = JSON.parse(json);
		for (var i = 0; i < json.length; ++i) {
			var jsonObj = JSON.parse(json[i]);
			console.log(req.body.id + '\n');
			console.log(jsonObj.id);
			if (req.body.id == jsonObj.id && req.body.type == 'host') {
				jsonObj.rating = req.body.rating;
				json[i] = JSON.stringify(jsonObj);
				fs.writeFile('data/users.json', JSON.stringify(json), function(err) {
					if (err) {
						return console.log(err);
					}
				});
				break;
			}
		}
	}	
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

app.post('/existing-host', function(req, res) {
	fs.readFile('data/users.json', 'utf8', function readFileCallback(err, data) {
		res.send(data);
	});
});

app.post('/existing-client', function(req, res) {
	fs.readFile('data/users.json', 'utf8', function readFileCallback(err, data) {
		res.send(data);
	});
});

app.post('/edit-host', function(req, res) {
	fs.readFile('data/users.json', 'utf8', function readFileCallback(err, data) {
		res.send(data);
	});
});

app.post('/edit-client', function(req, res) {
	fs.readFile('data/users.json', 'utf8', function readFileCallback(err, data) {
		res.send(data);
	});
});

app.post('/thumbs-up-host', function(req, res) {
	fs.readFile('data/users.json', 'utf8', function readFileCallback(err, data) {
		res.send(data);
	});
});

app.post('/thumbs-down-host', function(req, res) {
	fs.readFile('data/users.json', 'utf8', function readFileCallback(err, data) {
		res.send(data);
	});
});

app.post('/map-markers', function(req, res) {
	fs.readFile('data/users.json', 'utf8', function readFileCallback(err, data) {
		res.send(data);
	});
});

app.listen(3000, function() {
	console.log('Live at port 3000');
});
