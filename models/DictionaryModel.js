const mongoose = require("mongoose");

const definitionSchema = mongoose.Schema({
  definition: {
    type: String,
    required: true
  }
});
const MeaningSchema = mongoose.Schema({
  definitions: {
    type: [definitionSchema],
    required: true
  }
});

const DictionarySchema = mongoose.Schema({
  word: {
    type: String,
    required: true
  },
  meanings: {
    type: [MeaningSchema],
    required: true
  }
}, {
  timestamps: true
});

const Dictionary = mongoose.model('Dictionary', DictionarySchema);

module.exports = Dictionary;
