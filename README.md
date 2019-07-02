# OH-AUTH

[![CircleCI](https://circleci.com/gh/hanifanm/oh-auth.svg?style=svg)](https://circleci.com/gh/hanifanm/oh-auth)

Example project for login and registration process.
See the live demo [here](https://elated-engelbart-93990b.netlify.com).

[![COVER](./cover.png)](https://elated-engelbart-93990b.netlify.com)

## Tech Used

#### Front End

- React JS
- Next JS
- SCSS
- Served from [Netlify](https://elated-engelbart-93990b.netlify.com/)

#### Restfull API

- Express JS
- Served from [Heroku](https://oh-auth-api.herokuapp.com/)

#### Database 

- PostgreSQL
- Served from [ElephantSQL](https://www.elephantsql.com/)

## To Install On Your Local Server

#### Server / BE

Notice that the directory for the server is on the ~/oh-auth-api
- From the root directory, get in to the server directory
```
$ cd oh-auth-api
```
- Install dependency for the back end
```
$ yarn install
```
- Run on your local server
```
$ yarn dev
```
- Express app will run on [http://localhost:3030](http://localhost:3030)

#### Setup Email Sender [Optional]

To enable send email on the registration process, you have provide gmail account and password on the .env file. And also you have to authorize access from less secure apps to your gmail account in [Google Account Security](https://myaccount.google.com/security). Since i used [gmail-send](https://npmjs.com/package/gmail-send) library, so i think you can only use gmail account.

- In the oh-auth-api directory, create a file named .env
- Copy the content from .env.example file to .env file
- Put your gmail account on the .env file
```
GMAIL_ACCOUNT=<your-account@gmail.com>
GMAIL_PASSWORD=<your-secret-password>
```

#### Client / FE

- Clone repository
```
$ git clone https://github.com/hanifanm/oh-auth.git
$ cd oh-auth
```
- Install dependency for the front end
```
$ yarn install
```
- Run on your local server
```
$ yarn dev
```
- The app will run on [http://localhost:3000](http://localhost:3000)
- To make the app access your own local backend server, change the config.js file on the root directory
```
module.exports = {
  BASE_API: 'http://localhost:3030'
}
```

#### Change Database
Currently, this backend server access my postgres database on [ElephantSQL](https://www.elephantsql.com/). If you have your own database, you can change it so it access yours.
- Open db.js file in the ~/oh-auth-api/config directory
- Put your database setting there

