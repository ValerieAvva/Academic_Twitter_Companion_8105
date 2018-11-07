//database
var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://matt:msl@academictwitter-nlieo.mongodb.net/test?retryWrites=true').then(() => {
  console.log('connected');
}).catch(err => console.log(err));
var TweetModel = require("../models/tweet.js");
var SectionModel = require("../models/section.js");


var async = require("async");
var Twitter = require('twitter');
var config = require('./config.js');
var request = require('request');
var T = new Twitter(config);
var numHash = 0;
console.log("1");
SectionModel.find({}, 'topics', function(err, hashtags) {
    if (!err) {
        console.log("hi");
        console.log(hashtags);
        var hashtagsQuery = [];
        var i = 0;
        async.whilst(function() {
            return i < hashtags.length;
        }, 
        function(nextouter) {
            numHash += (hashtags[i]['topics'].length);
            var j = 0;
            async.whilst(function() {
                return j < hashtags[i]['topics'].length;
            },
            function(next) {
                var currHash = hashtags[i]['topics'][j];
                TweetModel.findOne({hashtags: currHash}).sort('-id').select('id').exec(function(err, tweet) {
                    console.log('in tweet search');
                    if(tweet==null) {
                        hashtagsQuery.push({hashtag: currHash, id: 0});
                    } else {
                        hashtagsQuery.push({hashtag: currHash, id: tweet});
                    }
                });
                j++;
                next();
            }, 
            function(err) {
                console.log(err);
            });
            i++;
            nextouter();
        },
        function(err) {
            console.log(err);
        });  
        console.log(hashtagsQuery);
        console.log('sep');
        getTweets(hashtagsQuery);
    } else {
        console.log(err);
    }
});
function getTweets(hashtagsQuery) { console.log(hashtagsQuery); }
function get() {
var hashIndex = 0;
async.whilst(function() {
    return hashIndex < hashtagsQuery.length;
},
function(nextouter) {
    var maxId = 0;
    var params;
    var query = hashtagsQuery[hashIndex];
    if (lastid > 0) {
        params = { q: query, count: 100, tweet_mode: "extended", since_id: lastid };
    } else {
        params = { q: query, count: 100, tweet_mode: "extended" };
    }
    T.get('search/tweets', params, function(err, data, response) {
        if(!err){
            var tweets = data['statuses'];
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
            //what if its the first time collecting for this hashtag? you need to handle that case
            async.whilst(function() {
                return maxId > lastid;
            },
            function (next) {    
                if (lastid > 0) {
                    params = { q: query, count: 100, since_id: lastid, max_id: maxId, tweet_mode: "extended" };
                } else {
                    params = { q: query, count: 100, max_id: maxId, tweet_mode: "extended" };
                }
                T.get('search/tweets', params, function(err, data, response) {
                    if(!err){
                        var tweets = data['statuses'];
                        if (tweets == null) {
                            nextouter();
                        }
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
                        if (tweets.length > 0) {
                            maxId = tweets[tweets.length - 1]['id'];
                        }
                        next();
                    } else {
                        console.log(err);
                        return;
                    }
                });
            },
            function (err) {
                console.log(err);
                return;
            });
        } else {
            console.log(err);
        }
        hashIndex++;
        nextouter();
    });
},
function(err) {
    console.log(err);
    return;
});
}
