//Code Here
const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');

const url = "mongodb://localhost:27017/movieQuotes"
const port = 3000;
app.use(bodyParser.urlencoded({extented: true}));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/www/index.html');
})

app.post('/addQuotes', function(req, res){
  db.collection("quotes").insertOne(req.body, function(err, result){
    if (err) throw err;
    console.log("Saved");
    res.redirect('/');
  })
})

app.get('/getQuotes',function(req, res){
  db.collection("quotes").find().toArray(function(err, result){
    if (err) throw err;
    res.send(result);
  })
})

MongoClient.connect(url, function(err, client){
  if (err) throw err;
  console.log("Connection to the DB successful");
  db = client.db("movieQuotes");
})

app.listen(port, function() {
  console.log(`App Listening on Port ${port}`)
})
