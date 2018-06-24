const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const db = require('./config/db');
const app = express();

// const port = 8000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var urlDB = 'mongodb://pioneer:pio159@ds259210.mlab.com:59210/teeny';

//connect to db
MongoClient.connect(urlDB, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error: ', err);
  } else {
    console.log('Connection established to ', urlDB);
  }

  // app.listen(port, function(){
  //   console.log("Listening on port: " + port);
  // });
  require('./app/routes')(app, db);

});

app.use(express.static(__dirname));
app.get('/', function(req, res) {
    res.sendfile('index.html', {root: __dirname })
});
const server = app.listen(process.env.PORT || 80);