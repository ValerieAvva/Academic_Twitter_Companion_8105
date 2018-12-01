# Academic Twitter Companion Docs

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.7.3.

## Development server

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files. Changes to the api require stopping and restarting the the server. 

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Release Notes
New Features
- Added login and create user screen
- Deployed system to heroku server at https://academic-twitter-companion.herokuapp.com/view/180237

## Bug fixes
- Fixed missing dependencies in package-lock.json for deployment to heroku server
- Fixed package visibility to allow for production building
- Getting actual class start and end date
- Topic count is more accurate

## Known bugs and defects
- Graphs on class page sometimes don’t show up proportionate to their numbers (although the numbers are right)
- Tweets/retweets/likes might refer to a different data than expected (retweets and likes are on the student’s tweets, not their number of retweets and likes)
- On create user page, password does not match bubble isn’t centered
- My class doesn’t redirect to the home page
- Forgot password not yet working

## Install Guide
# Pre-requisites:​

This code was developed and tested on Windows 10 machines. This install guide and related documents are written for use in that environment. Other operating systems can access the final deployed web application, but this guide does not contain information on how to deploy this web application in other operating systems. 

# Local setup:

Download and install node.js and npm. https://www.npmjs.com/get-npm

Get a copy of the source code. Either through downloading from github or using git to clone it. The following is a link to the github https://github.com/lemonsmatt/Academic_Twitter_Companion_8105.

Open a command prompt and navigate to the root directory of the source code

# Run the following commands:

'npm install'
'npm install -g @angular/cli'
'npm install express'
'npm install mongoose'
'ng build'
'npm start'

Open a web browser and navigate to http://localhost:3000/ 

# Deploy to a heroku server:
	
The Georgia Tech version of this website is hosted at https://academic-twitter-companion.herokuapp.com/view/180237 . It automatically updates with changes to the source code. To host a different version, the following instructions will walk through the process.

Install heroku per the instructions on this site https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up

Open a command prompt and navigate to the root directory of the source code used in the local setup. 

# Run the following commands
'heroku login'
Login with a heroku account
'heroku create'
'git push heroku master'
'heroku open'

## Troubleshooting: ​ 
For trouble with running the code:
Try 'npm install' again
After building, can try 'node server.js' to run

