var mongoose = require('mongoose');
var Appoint = mongoose.model('Appoint');
var User = mongoose.model('User');

module.exports = (function(){
	return{
		index: function(req, res){
			var _date = new Date();
			console.log('current date: ', _date);

			Appoint.find({app_date: {$gte:_date}}).populate('_user').exec(function(err, appoints){
				res.json(appoints);
			})
		},

		deleteApp: function(req, res){
			console.log('user id: ', req.body.user_id);
			console.log('app id: ', req.body.app_id);

			User.findByIdAndUpdate(req.body.user_id, {$pull: {appoints: req.body.app_id}}, function(err, data){
				if(err){
					console.log('error to remove apps in user', err);
				}else{
					console.log('successfully remove the app from user', data);
					Appoint.remove({_id:req.body.app_id}, function(err){
						if(err){
							console.log('can not remove the apps');
							res.json(err);
						}else{
							console.log('successfully remove the app');
							
						}
					});
					module.exports.index(req, res);
				}
			});	
		},

		addApp: function(req, res){
			console.log('uer id: ', req.params.uid);
			console.log('app info: ', req.body);
			User.findOne({_id: req.params.uid}, function(err, person){
				if(err){
					console.log('error in find user with id ', err);
				}else{
					var app = new Appoint(req.body);
					app._user = person._id;
					person.appoints.push(app);
					app.save(function(err){
						person.save(function(err){
							if(err){
								console.log(err);
							}else{
								module.exports.index(req, res);
							}
						})
					})
				}
			})
		}

	}
})();