var express = require('express');
var path = require('path');
var bodyParser = require('body-parser'); 

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

var jsonToCSVConverter = require('./client/jsonToCsvConverter')


app.use('/client', express.static(path.join(__dirname, '/client')))
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/client/index.html')))
app.post('/', (req, res) => {
  if (!req.body) return res.sendStatus(400);
  var prasedBody = JSON.parse(req.body.input); 
  var CSVdata = jsonToCSVConverter.JSONtoCSV(prasedBody, req.body.filter);
  res.set('text/csv')
  .status(201)
  .send(CSVdata);
})


app.listen(3000, () => console.log('CSV FILE LISTENER listening on port 3000!'))
