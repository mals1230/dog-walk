const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const bookWalkSchema = new Schema({
    walkDate: {
      type: Date,
      required: true,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },
    walkTime: {
      type: Date,
      required: true,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },
    walkDuration: {
      type: Number,
      required: true,
      trim: true,
    },
    dogWalker: [
        {
          type: Schema.Types.ObjectId,
          ref: 'DogWalker',
        },
      ],
    pet: [        {
        type: Schema.Types.ObjectId,
        ref: 'Pet',
      },
    ],
  });
  
  const BookWalk = model('BookWalk', bookWalkSchema);
  
  module.exports = BookWalk;