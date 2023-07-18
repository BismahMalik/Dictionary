const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const axios = require('axios');
const https= require('https');
const Dictionary = require('./models/DictionaryModel');

app.get('/', (req, res) => {
    return res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const getPath = async (req, res) => {
    const word = req.query.word;
    const currentUrl = `https://localhost:3000/Dictionarys/${encodeURIComponent(word)}`;
    const fallbackUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`;

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
                        res.status(500).json({ error: 'Failed to fetch data from fallback URL' });
                    });
            }
        })
        .catch(function (error) {
            res.status(500).json({ error: 'Failed to fetch data from current URL' });
        });
};

const getFallBackUrl = (req, res) => {

    const fallbackData = {
        message: 'This is the fallback URL response'
    };
    res.json(fallbackData);
}
const getAllWords = async (req, res) => {
    try {
        const Dictionaries = await Dictionary.find({})
        res.status(200).json(Dictionaries);

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getSpecificWord = async (req, res) => {
    try {
        const word = req.params.word
        const Dictionaries = await Dictionary.find({ word })
        res.status(200).json(Dictionaries);

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


const postWord = async (req, res) => {
    try {
    
        const word = req.query.word;
        const url = `https://localhost:3000/searchword?word=${encodeURIComponent(word)}`;
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

}

const updateWord = async (req, res) => {
    try {
        const word = req.params.word
        const Dictionaries = await Dictionary.findOneAndUpdate({ word }, req.body);
        if (!Dictionaries) {
            return res.status(404).json("Word Not Found");
        }
        const updatedDictionaries = await Dictionary.find({ word });
        res.status(202).json(updatedDictionaries);

    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}

const deleteWord = async (req, res) => {
    try {
        const word = req.params.word
        const Dictionaries = await Dictionary.findOneAndDelete({ word });
        if (!Dictionaries) {
            return res.status(404).json("Word Not Deleted");
        }
        res.status(202).json(Dictionaries);

    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}

module.exports = {
    getPath,
    getFallBackUrl,
    getAllWords,
    getSpecificWord,
    postWord,
    updateWord,
    deleteWord,
};