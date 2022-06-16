const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes');
const path = require('path');
const app = express();
require('dotenv');
const PORT = process.env.PORT || 3001;
const morgan = require('morgan');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(routes);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build/index.html'), function(err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

// Connect to the Mongo DB
mongoose.connect(
  // process.env.MONGODB_URI
  "mongodb+srv://hemantashta:Hemant@01@cluster0.4mibn.mongodb.net/?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);

app.use(morgan('dev'));

app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
