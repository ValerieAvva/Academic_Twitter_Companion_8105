 // grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var studentSchema = new Schema({
        id : Number,
        name :  String,
        handle:  { type: String, required: true},
        courseNum: {type: Number, required: true},
        totTweets: {type: Number, default: 0},
        totRetweets: {type: Number, default: 0},
        totLikes: {type: Number, default: 0},
        topicDist: [String],
        topicDistNum: [Number]
});

var StudentModel = mongoose.model('StudentModel', studentSchema);


module.exports = StudentModel;

