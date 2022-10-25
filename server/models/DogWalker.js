const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const dogWalkerSchema = new Schema({
    walkerName: {
      type: String,
      required: true,
      trim: true,
    },
    walkerBio: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 280,
    },
  });
  
  const DogWalker = model('DogWalker', dogWalkerSchema);
  
  module.exports = DogWalker;