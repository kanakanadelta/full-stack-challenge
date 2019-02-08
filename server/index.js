const express = require('express');

//middleware
const parser = require('body-parser'); //Parse incoming request bodies
const path = require('path');
const PORT = 9001;

const db = require('../database');
const router = require('./router.js')

const app = express();

//initiate use of middle-ware
app.use(parser.json());
app.use(parser.urlencoded({
  extended: true
}));
// The "extended" syntax allows for rich objects and arrays to be encoded into the URL-encoded format
// allowing for a JSON-like experience with URL-encoded.
app.use('/api', router);

app.use(express.static(path.resolve(__dirname, '../public')));

app.listen(PORT, ()=> {
  console.log('Express.js is now listening to port no.', PORT)
})