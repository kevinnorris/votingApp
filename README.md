# Voting App

For freeCodeCamp’s first dynamic web application projects.

## Installation

### .env file

Create a ```.env``` file in the top level directory and add the following to it

```
GITHUB_KEY=
GITHUB_SECRET=
GOOGLE_KEY=
GOOGLE_SECRET=
MONGO_URI=
PORT=8080
APP_URL=http://localhost:8080/
JWT_SECRET=
```

* Create a github app for authentication and plug in the key and secret
* Create a google app for authentication and plug in the key and secret
* Install mongodb locally and add the local URI or use something like [mLab](https://mlab.com/)
* Add a secret string to ```JWT_SECRET```

### Other required alterations

Change the ```userStorageString``` and ```tokenStorageString``` variables in ```client/util/localStorage.js``` to a custom value. Otherwise any other versions of this project will overwrite your local storage saves.

### Running

You must have Nodejs installed on your machine.

* ```npm install```
* ```npm start```

## License

[MIT](https://opensource.org/licenses/MIT)