var express = require('express');
var app = express();
var router = express.Router();
var path = __dirname + '/views/';

router.use(function (req, res, next) {
	console.log('/' + req.method);
	next();
});

router.get('/', function(req, res) {
	res.sendFile(path + 'index.html');
});

// router.get('/event.html', function(req, res) {
// 	res.sendFile(path + 'event.html');
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

app.use(express.static(__dirname + '/images'));

// app.use('*', function(req, res) {
// 	res.sendFile(path + '404.html');
// });

app.listen(3000, function() {
	console.log('Live at port 3000');
});