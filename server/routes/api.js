const express = require('express');
const router = express.Router();

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

var SectionModel = require('../models/section.js');
var StudentModel = require("../models/student.js");
var TweetModel = require("../models/tweet.js");
var stringHash = require("string-hash");

// SECTIONS
// Get all sections
router.get('/sections', (req, res) => {
    SectionModel.find({}, function(err, sections) {
      if (err) throw err;

      // object of all the users
      res.json(sections);
    });
});

router.get('/sections/:id', (req, res) => {
  SectionModel.findOne({courseNum: req.params.id}, function(err, sections) {
    if (err) throw err;

    // object of all the users

    res.json(sections);
  });
});

//put new section
router.put('/sections', (req, res) => {
  SectionModel.update({id: req.body.id}, req.body, function(err, section) {
    if (err) throw err;

    // object of all the users
    res.json(section);
  });
});

//put new section
router.post('/sections', (req, res) => {
  var newSection = SectionModel({
      id: req.body.courseNum,
      courseNum: req.body.courseNum,  
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      name: req.body.name,
      topics:  req.body.topics
    });

    newSection.save(function(err) {
        if (err) throw err;
        res.json(201, newSection);
    });


});

// STUDENTS 
// Get student by id
router.get('/students/:id', (req, res) => {
  StudentModel.findOne({id: req.params.id}, function(err, student) {
    if (err) throw err;

    res.json(student);
  });
});

// Get all students for section
router.get('/students/sectionID/:id', (req, res) => {
  StudentModel.find({courseNum: req.params.id}, function(err, students) {
    if (err) throw err;

    // object of all the users
    res.json(students);
  });
});

//put new student
router.put('/students', (req, res) => {
  StudentModel.findOneAndUpdate({id: req.body.id}, function(err, student) {
    if (err) throw err;

    // object of all the users
    res.json(students);
  });
});

//delete student
router.delete('/students/:id', (req, res) => {
  StudentModel.deleteOne({id: req.params.id}, function(err, student) {
    if (err) throw err;

    res.json(student);
  })

});

//post new student
router.post('/students', (req, res) => {
  var newStudent = StudentModel({
        id : stringHash(req.body.handle) * 1000000 + req.body.courseNum,
        name :  req.body.name,
        handle:  req.body.handle,
        courseNum: req.body.courseNum,
        totTweets: req.body.totTweets,
        totRetweets: req.body.totRetweets,
        totLikes: req.body.totLikes,
        topicDist: req.body.topicDist,
        topicDistNum: req.body.topicDistNum
  })
    newStudent.save(function(err) {
        if (err) throw err;
    });
});

//TWEETS
// Get tweets by tweet id
router.get('/tweets/:id', (req, res) => {
  console.log("Getting tweets by tweet id");
  console.log(req.params);
  TweetModel.findOne({id: req.params.id}, function(err, tweet) {
    if (err) throw err;

    console.log(tweet);
    res.json(tweet);
  });
});

// Get all tweets for a specific student
router.get('/tweets/students/:handle', (req, res) => {
  console.log("Getting all tweets for student id");
  console.log(req.params);
  TweetModel.find({handle: req.params.handle}, function(err, tweets) {
    if (err) throw err;
    // object of all the tweets
    console.log(tweets);
    res.json(tweets);
  });
  console.log("-------");
});

// Put tweet
router.put('/tweets', (req, res) => {
  console.log("Put Tweets")
  console.log(req.body);
  TweetModel.findOneAndUpdate({id: req.body.id}, function(err, tweet) {
    if (err) throw err;

    // object of all the tweets
    console.log(tweets);
    res.json(tweets);
  });
  console.log("-------")
});

//Delete tweet by id
router.delete('/tweets/:id', (req, res) => {
  console.log("DELETE tweet");
  console.log(req.params);
  TweetModel.deleteOne({id: req.params.id}, function(err, tweet) {
    if (err) throw err;

    res.json(tweet);
  })

});

// Post new tweet
router.post('/tweets', (req, res) => {
  console.log("New Tweet")
  console.log(req.body);
  console.log("-------")
  var newTweet = TweetModel({
        id : req.body.id,
        user : req.body.username,
        handle : req.body.handle,
        timestamp: req.body.timestamp,
        content : req.body.content,
        hashtags : req.body.hashtags,
        likes : req.body.likes,
        retweets : req.body.retweets
  })
    newTweet.save(function(err) {
        if (err) throw err;
    });
});


module.exports = router;