
var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://matt:msl@academictwitter-nlieo.mongodb.net/test?retryWrites=true');


var Twitter = require('twitter');
var config = require('./config.js');
var TweetModel = require("../models/tweet.js");
var request = require('request');

var T = new Twitter(config);
var hashtags = ["#1102kidsci"]; //collect these from database instead
var lastid = 1; //get last id in database
console.log("collect");
for(var i = 0; i < hashtags.length; i++) {
    var maxId = 0;
    var params = { q: hashtags[i], count: 100, since_id: lastid};
    T.get('search/tweets', params, function(err, data, response) {
        if(!err){
            var tweets = data['statuses'];
            //console.log(tweets);
            for(let t of tweets)
            {
                var hashtags = [];
                for (let h of t.entities.hashtags)
                {
                    hashtags.push(h.text)
                }
                var newTweet = TweetModel({
                    id: t.id,
                    username: t.user.name,
                    handle: "@" + t.user.screen_name,
                    timestamp: t.created_at,
                    content: t.text,
                    hashtags: hashtags,
                    likes: t.favorite_count,
                    retweets: t.retweet_count
                })
                newTweet.save(function(err) {
                    if (err) throw err;
                });
            }
            maxId = tweets[tweets.length - 1]['id'];
        } else {
            console.log(err);
        }
    });
    while(maxId > lastid) {
        var params = { q: hashtags[i], count: 100, since_id: lastid, max_id: maxId };
        T.get('search/tweets', params, function(err, data, response) {
            if(!err){
                var tweets = data['statuses'];
                //console.log(tweets);
                for(let t of tweets)
                {
                    var hashtags = [];
                    for (let h of t.entities.hashtags)
                    {
                        hashtags.push(h.text)
                    }
                    var newTweet = new TweetModel({
                        id: t.id,
                        username: t.user.name,
                        handle: "@" + t.user.screen_name,
                        timestamp: t.created_at,
                        content: t.text,
                        hashtags: hashtags,
                        likes: t.favorite_count,
                        retweets: t.retweet_count
                    });

                    newTweet.save(function(err) {
                        if (err) throw err;
                    });

                }
                maxId = tweets[tweets.length - 1]['id'];
            } else {
                console.log(err);
            }
        });
    }
}
