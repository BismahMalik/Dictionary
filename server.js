const express = require('express')
const cors = require('cors');

const app = express();

// Middleware to enable CORS
app.use(cors());
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
//mongoose.connect('mongodb+srv://211354:Rx1yppNoqR7ljL2S@cluster0.3wcc5i2.mongodb.net/FetchedDictionary?retryWrites=true&w=majority')

app.get('/api/users', (req, res) => {
  const word = req.query.word;

  const currentUrl = `https://api.example.com/Dictionarys/${encodeURIComponent(word)}`;
  const fallbackUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`; // Replace with your fallback URL

  axios.get(currentUrl)
    .then(function (response) {
      const data = response.data;
      if (data.length > 0) {
        res.json(data);
      } else {
        // Word not found on current URL, fetch from fallback URL
        axios.get(fallbackUrl)
          .then(function (fallbackResponse) {
            const fallbackData = fallbackResponse.data;
            res.json(fallbackData);
          })
          .catch(function (fallbackError) {
            console.error(fallbackError);
            res.status(500).json({ error: 'Failed to fetch data from fallback URL' });
          });
      }
    })
    .catch(function (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch data from current URL' });
    });
});

app.get('/fallbackURL', (req, res) => {
  // Handle requests to the fallback URL here
  // This can be a separate logic to fetch data from the fallback URL or any other functionality specific to the fallback URL

  // Example response:
  const fallbackData = {
    message: 'This is the fallback URL response'
  };
  res.json(fallbackData);
});



//rote
app.use(express.json())
app.get('/', (req, res) => {
  res.send('Connected')
})
app.get('/Dictionary', async (req, res) => {
  try {
    const Dictionaries = await Dictionary.find({})
    res.status(200).json(Dictionaries);

  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message })
  }
})
app.get('/Dictionarys/:word', async (req, res) => {
  try {
    const word = req.params.word
    const Dictionaries = await Dictionary.find({ word })
    res.status(200).json(Dictionaries);

  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message })
  }
})

app.post('/Dictionary', async (req, res) => {
  try {
    
    const word = req.query.word;
    const url = `http://api.example.com/searchword?word=${encodeURIComponent(word)}`;
    axios
        .get(url)
        .then(response => {
            const entries = response.data;

            for (let i = 0; i < entries.length; i++) {
                const entry = entries[i];
                const word = entry.word;
                const meanings = entry.meanings;

                const newPost = new Dictionary({
                    word: word,
                    meanings: meanings,

                });
                newPost.save()
            }
        })

} catch (error) {
    res.status(500).json({ message: error.message })

}


})

app.put('/Dictionarys/:word', async (req, res) => {
  try {
    const word = req.params.word
    const Dictionaries = await Dictionary.findOneAndUpdate({ word }, req.body);
    if (!Dictionaries) {
      return res.status(404).json("Word Not Found");
    }
    const updatedDictionaries = await Dictionary.find({ word });
    res.status(202).json(updatedDictionaries);

  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message })
  }

})
app.delete('/Dictionarys/:word', async (req, res) => {
  try {
    const word = req.params.word
    const Dictionaries = await Dictionary.findOneAndDelete({ word });
    if (!Dictionaries) {
      return res.status(404).json("Word Not Deleted");
    }
    res.status(202).json(Dictionaries);

  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message })
  }

})

