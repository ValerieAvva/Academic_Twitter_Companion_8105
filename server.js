// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://matt:msl@academictwitter-nlieo.mongodb.net/test?retryWrites=true').then(() => {
  console.log('connected');
}).catch(err => console.log(err));

//run tweet collection every ______
function collectTweets() {
  var cp = require('child_process');
  var n = cp.fork('./server/twitter/collect.js');
  setTimeout(collectTweets, 3000000);
}
collectTweets();

const bodyParser = require('body-parser');

// Get our API routes
const api = require('./server/routes/api');

const app = express();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// Set our api routes
app.use('/api', api);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));
