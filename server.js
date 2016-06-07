const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;
var db, cursor;

MongoClient.connect('mongodb://iobiob:iobiobiob@ds019633.mlab.com:19633/star-wars-quotes', (err, database) => {
	if (err) return console.log(err)
	db = database;
	app.listen(3000, function() {
		console.log('listening on 3000')
	})
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

app.get('/', (req, res) => {
  db.collection('quotes').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {quotes: result})
  })
});

app.get('/quote/:id',(req,res)=>{
db.collection('quotes').find().toArray((err, result) => {
    if (err) return console.log(err);
    var quoteSelected;
    for(quote in result){
      if(result[quote]._id==req.params.id){
        quoteSelected = result[quote]; 
        console.log(result[quote]);
      }
    }
  res.render('quote.ejs', {quote: quoteSelected});
    
  });

});

app.post('/quotes', (req, res) => {
	db.collection('quotes').save(req.body, (err, result) => {
		if (err) return console.log(err)
		console.log(req.body)
		res.redirect('/')
	})
});

app.put('/quotes', (req, res) => {
  db.collection('quotes').findOneAndUpdate({name: 'Yoda'}, {
    $set: {
      name: req.body.name,
      quote: req.body.quote
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
    console.log('Darth Vader invaded.')
  })
});

app.delete('/quotes', (req, res) => {
  db.collection('quotes').findOneAndDelete({name: req.body.name}, 
  (err, result) => {
    if (err) return res.send(500, err)
    res.send(result)
    console.log('A darth vader quote got deleted.')
  })
});


//app.put('/quotes', (req, res) => {
//  db.collection.updateOne({_id:req.body.id}, {
//    $set: {
//      name: req.body.editname,
//    quote: req.body.editquote
//    }
//  },{
//    upsert: false
//  }, (err, result) => {
//    if (err) return res.send(err)
//    res.send(result)
//    console.log('server edit code done')
//  })
//});

//END OF CODE//

