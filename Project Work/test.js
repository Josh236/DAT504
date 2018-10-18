
const JustWatch = require('./script.js');
const fetch = require('node-fetch');
const express = require('express');
const app = express();
const port = 3001;
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/WatchList";

let db;

app.get('/', function(req, res){
  res.sendFile(__dirname + 'index.html');
});

MongoClient.connect(url, function(err, client){
  if (err) throw err;
  console.log("Database created");
  db = client.db("WatchList");
})

app.listen(port, () => {
  console.log("server listening on port" + port);
});


function print_result(name, result)
{
	console.log(name+":");
	console.log(JSON.stringify(result, null, 4));
	console.log("\n\n\n\n");
}

(async function(){
	var justwatch = new JustWatch();
  var userSearch = 'John'
	var searchResult = await justwatch.search({query: userSearch});
	print_result("search", searchResult);

	var episodes = await justwatch.getEpisodes(searchResult.items[0].id);
	print_result("episodes", episodes);

  db.collection("results").insertOne({ 'item': searchResult }, function (err, print_result) {
    if (err) throw err;
    console.log('insert success')
  })
 })
app.get('/retrievedata', function(req, res){
  db.collection("results").find().toArray(function(err, result){
    if (err) throw err;
    res.send(result);
    console.log(result);
  })
})
();
