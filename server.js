
var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;


var request = require('request');

var cheerio = require('cheerio');

var logger = require('morgan');

app.use("/jscripts", express.static("public/jscripts"));
app.use("/css", express.static("public/css"));
app.use(logger('dev')

//body-parser setup
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
  extended: false
}));

//handlebars setup
var expressHandlebars = require('express-handlebars');
app.engine('handlebars', expressHandlebars(
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

//mongoose setup
var mongoose = require('mongoose')


mongoose.connect('mongodb://localhost/scraper');
var db = mongoose.connection;

db.on('error', function(err) {
  console.log('Mongoose Error: ', err);
});
db.once('open', function() {
  console.log('Mongoose connection successful.');
});

var ScrapedData = require('./models/scrapedDataModel.js');
var Note = require('./models/noteModel.js')

//routes
app.get('/', function(req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
 
});

//scrape data and save 
app.get('/scrape', function(req, res) {
  request('https://www.nhmagazine.com', function (error, response, html) {
    var $ = cheerio.load(html);
    var result = [];
    $(".title").each(function(i, element)

      var title = $(this).text();
      var link = $(element).children().attr('href');

      if (title && link) {
        var newScrapedData = new ScrapedData({title:title, link:link});
        //mongoose save data
        newScrapedData.save(function(err, doc) {
          if (err) {
            console.log(err)   
          } else {
            console.log(doc)    
          }
        });
      }
    });
  });
  res.send("Scrapped saved");
});

//get data from the database
app.get('/getItems', function(req, res) {
  //mongoose find data
  ScrapedData.find({}, function(err, dbResults) {
    if (err) {
      res.send(err);
    } else {
      res.send(dbResults);
    }
  });
});


app.get('/deleteAll', function(req, res) 

  Note.remove({}, function(err, dbResults) {
    if (err) {
      res.send(err);
    } else {
      //res.send(dbResults);
    }
  });

  ScrapedData.remove({}, function(err, dbResults) {
    if (err) {
      res.send(err);
    } else {
      res.send(dbResults);
    }
  });
});

app.get("/delete/:id", function(req, res){
  var id = req.params.id;
  console.log(req.params.id);
  ScrapedData.remove({_id:id}, function(err, dbResults){
    if(!err){
      res.send("success");
    }
    else{
      res.send(dbResults);
    }
  });
});

app.post('/submit/:id', function(req, res) {
  var newNote = new Note(req.body);
  var id = req.params.id;
  //Save the new note
    newNote.save(function(err, doc) {
      if (err) {
        res.send(err);
      } else {

  
      ScrapedData.findOneAndUpdate({_id:id}, {$push: {'notes': doc._id}}, {new: true}, function(err, doc) {
        if (err) {
          res.send(err);
        } else {
          console.log(doc)   //res.send(doc);
        }
      });
    }
  });
});

app.listen(PORT, function() {
  console.log("Listening at %s", PORT);
});
