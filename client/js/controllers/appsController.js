myApp.controller('appsController', function(appFactory){
	var _this = this;
	this.hasAppoint = false;
	this.today_date = new Date();
	this.old_day = false;
	console.log('$$$$$ Today: ', this.today_date);
	
	appFactory.index(function(data){
		_this.allApps = data;
		console.log('all appointments: ', _this.allApps);
	})

	this.addApp = function(){
		this.old_day = false;
		this.hasAppoint = false;
		
		if(this.today_date > this.new_app.app_date){
			console.log('old day##########');
			this.old_day = true;
		}else if (this.hasAppoints()){
			console.log('you already have an appointsment on that day!');
			this.hasAppoint = true;
		}else if(this.dayFull()){
			console.log('sorry! the date you picked is full. please try other date');
		}else{
			console.log('ready to add!@@@@@@@@');
			appFactory.addApp(this.user_id, this.new_app, function(data){
				if(data.message){
					_this.errors = data.errors.name.message;
				}else{
					_this.allApps = data;
					console.log('allApps updated after addApp: ', _this.allApps);
					_this.new_app = {};
				}
			});		
		}
	}

	this.hasAppoints = function(){
		var _new =  this.new_app.app_date;

		if(this.allApps !== undefined){
			for(var i=0;i<this.allApps.length;i++){
				
				var _d = new Date(this.allApps[i].app_date);
				console.log('###user: ', this.user_id);
				console.log('###user: ', this.allApps[i]._user._id);
				if(this.allApps[i]._user._id == this.user_id){
					console.log('user: ', this.user_id);
					console.log('date from db: ', _d.getDate(), _d.getMonth(), _d.getFullYear());
					console.log('date new: ', _new.getDate(), _new.getMonth(), _new.getFullYear());
					if(_d.getDate() == _new.getDate() && _d.getMonth() == _new.getMonth() && _d.getFullYear() == _new.getFullYear()){
						return true;
					}
				}
			}
			return false;	
		}else{
			return false;	
		}
	}

	this.dayFull = function(){
		var count = 0;
		for(var i=0; i<this.allApps.length;i++){
			var _d = new Date(this.allApps[i].app_date);
			if(this.checkSameDate(this.new_app.app_date, _d)){
				count++;
			}
			if(count >= 3){
				return true;
			}
		}
		return false;
	}

	this.checkSameDate = function(d1, d2){
		if(d1.getDate() == d2.getDate() && d1.getMonth() == d2.getMonth() && d1.getFullYear() == d2.getFullYear()){
						return true;
		}
	}
	this.deleteApp = function(uid, aid){
		console.log('user id: app id: ', uid, aid);
		appFactory.deleteApp(uid, aid, function(data){
			_this.allApps = data;
			console.log('allApps updated after deleteApp: ', _this.allApps);
		})
	}
});