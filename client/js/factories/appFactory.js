myApp.factory('appFactory', function($http){
	var factory = {};

	factory.index = function(callback){
		$http.get('/indexApp').success(function(data){
			callback(data);
		})
	}

	factory.addApp = function(uid, new_app, callback){
		$http.post('/addApp/'+uid, new_app).success(function(output){
			callback(output);
		});
	}

	factory.deleteApp = function(uid, aid, callback){
		$http.post('/deleteApp', {user_id: uid, app_id: aid}).success(function(output){
			callback(output);
		});
	}

	return factory;
});