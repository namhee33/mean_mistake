var users = require('./../controllers/users.js');
var apps = require('./../controllers/apps.js');

//## add more controllers here 

module.exports = function(app){
	app.get('/user_index', function(req, res){
		users.user_index(req, res);
	});

	app.get('/indexApp', function(req, res){
		apps.index(req,res);
	})
	app.get('/get_user_by_name/:name', function(req, res){
		users.get_user_by_name(req, res);
	});

	app.post('/registerUser', function(req, res){
		users.registerUser(req, res);
	});

	app.post('/addApp/:uid', function(req, res){
		apps.addApp(req, res);
	});

	app.post('/deleteApp', function(req, res){
		apps.deleteApp(req, res);
	})
}