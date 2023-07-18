const express = require('express')
const routes = require('./route')
const app = express()
const axios = require('axios');
const Dictionary = require('./models/DictionaryModel')
const path = require('path')
const port = 3000
const mongoose = require("mongoose")
const uri = "mongodb+srv://211354:Rx1yppNoqR7ljL2S@cluster0.3wcc5i2.mongodb.net/FetchedDictionary?retryWrites=true&w=majority"

mongoose.connect(uri, {
  serverSelectionTimeoutMS: 30000,
  socketTimeoutMS: 30000,
});

app.use('/', routes);

app.get('/', (req, res) => {
  return res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use(express.static(path.join(__dirname, 'public'), {
  extensions: ['html', 'css', 'js'] // Add 'css' and 'js' to the list of allowed extensions
}));

app.use(express.json())
mongoose.connect(uri)
  .then(() => {
    app.listen(port, () => {
      console.log(`http://localhost:3000`);
    });
  })