var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new mongoose.Schema({
	name: {type:String, required: true, minlength:4, maxlength:20},
	appoints: [{type: Schema.Types.ObjectId, ref: 'Appoint'}]
});

var AppointSchema = new mongoose.Schema({
	app_date: {type: Date, required: true},
	app_time: {type:String},
	complain: {type:String},
	_user: {type: Schema.Types.ObjectId, ref: 'User'}
});

mongoose.model('User', UserSchema);
mongoose.model('Appoint', AppointSchema);