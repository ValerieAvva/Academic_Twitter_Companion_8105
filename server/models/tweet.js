 // grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var tweetSchema = new Schema({
	id : { type: Number, required: true, unique: true },
	username : { type: String, required: true},
	handle : { type: String, required: true},
	timestamp: { type: String, required: true},
	content: String,
	hashtags: [String],
	likes: Number,
	retweets: Number,
});

var TweetModel = mongoose.model('TweetModel', tweetSchema);

module.exports = TweetModel;

