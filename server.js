const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;
var db, cursor


MongoClient.connect('mongodb://iobiob:iobiobiob@ds019633.mlab.com:19633/star-wars-quotes', (err, database) => {
	if (err) return console.log(err)
	db = database
	app.listen(3000, function() {
		console.log('listening on 3000')
	})
})

app.use(bodyParser.urlencoded({extended: true}))


app.get('/', (req, res) => {
  db.collection('quotes').find().toArray((err, result) => {
    if (err) return console.log(err)
    // renders index.ejs
    res.render('index.ejs', {quotes: result})
  })
})

app.post('/quotes', (req, res) => {
	db.collection('quotes').save(req.body, (err, result) => {
		if (err) return console.log(err)

		console.log('Saved to database.')
		res.redirect('/')
	})
})



//app.get('/', (req, res) => {
//	res.sendFile(__dirname + '/index.html')
//	cursor = db.collection('quotes').find().toArray(function(err, results) {
//  	console.log(results)
//})