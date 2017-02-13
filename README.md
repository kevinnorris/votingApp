# Boilerplate for freeCodeCamp’s dynamic web application projects

This project provides a simple setup for building full stack applications in ES6. 

The backend is an API server built with [Express](http://expressjs.com/) that allows the client to access data and authenticate through api calls. [Passport](http://passportjs.org/) is used for authentication with third parties and [JSON Web Tokens](https://jwt.io/) for client to server authentication. [mongoose](http://mongoosejs.com/) is used to interact with a [MongoDB](https://www.mongodb.com/) database. 

The frontend is a single page application built using [ReactJS](https://facebook.github.io/react/) and [Redux](http://redux.js.org/).

### Motivation

As of writing this freeCodeCamp suggests using Clementinejs for building the dynamic web application projects. I wanted to use react on the front end and es6 throughout so I created this boilerplate to achieve that goal.

## Installation

#### .env file

Create a ```.env``` file in the top level directory and add the following to it

```
GITHUB_KEY=
GITHUB_SECRET=
MONGO_URI=
PORT=8080
APP_URL=http://localhost:8080/
JWT_SECRET=
```
Create a github app for authentication. 
* For the homepage URL paste ```http://localhost:8080/```
* For the Authorization callback URL paste ```http://localhost:8080/auth/github/callback```

GitHub will create an app and present you with a Client ID and a Client Secret which you add to to the .env file as the ```GITHUB_KEY``` and ```GITHUB_SECRET``` respectively. 

For the ```MONGO_URI``` install mongodb locally and add the local URI or use something like [mLab](https://mlab.com/)

Add a secret string to the ```JWT_SECRET```

Change the ```userStorageString``` and ```tokenStorageString``` variables in ```client/util/localStorage.js``` to a custom value. Otherwise any other versions of this project will overwrite your local storage saves.

#### Installing Packages

You must have Nodejs installed on your machine. 

* Open the client directory in a terminal and ```npm install```
* Install webpack globaly ```npm install -g webpack```
* While still in the client directory run ```webpack```
  * This will populate the ```client/public``` directory with the webpack transplied files
*  Go back to the main directory ```cd ..``` and ```npm install```
*  To start the project run ```npm run dev```

##### For Development

* Open a terminal, navigate to the client directory and run ```webpack --watch```
* Open another terminal, navigate to the main directory and run ```npm run dev```

When changes are made to the client webpack will re-transpile the files and when changes are made to the server nodemon will re-transpile the files.


## Production

* Open a terminal, navigate to the client, set ```NODE_ENV``` to ```'production'``` and run webpack
* navigate to the main directory, run ```npm run build``` then ```npm start```

## License

[MIT](https://opensource.org/licenses/MIT)