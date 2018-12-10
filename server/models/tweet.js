 // grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var tweetSchema = new Schema({
	id : { type: String, required: true, unique: true },
	username : { type: String, required: true},
	handle : { type: String, required: true},
	timestamp: { type: Date, required: true},
	content: String,
	hashtags: [String],
	likes: Number,
	retweets: Number,
	reply: Boolean,
	retweet: Boolean
});

var TweetModel = mongoose.model('TweetModel', tweetSchema);

module.exports = TweetModel;

