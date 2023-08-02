require('dotenv').config();
const express = require('express')
const routes = require('./route')
const app = express()
const axios = require('axios');
const Dictionary = require('./models/DictionaryModel')
const path = require('path')
const port = 3000
const mongoose = require("mongoose")
app.get('/', (req, res) => {
  return res.sendFile(path.join(__dirname, '/public', 'index.html'));
});

app.use(express.static(path.join(__dirname, '/public'), {
  extensions: ['html', 'css', 'js'] // Add 'css' and 'js' to the list of allowed extensions
}));
mongoose.connect(process.env.MONGODB_URL, {
  serverSelectionTimeoutMS: 30000,
  socketTimeoutMS: 30000,
});

app.use('/', routes);

app.use(express.json())
mongoose.connect(process.env.MONGODB_URL)
  .then(() => {
    app.listen(port, () => {
      console.log(`http://localhost:3000`);
    });
  })