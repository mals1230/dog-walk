const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const bookWalkSchema = new Schema({
    walkDate: {
      type: String,
      required: true,
    },
    walkTime: {
      type: String,
      required: true,
    },
    walkDuration: {
      type: String,
      required: true,
      trim: true,
    },
    dogWalker: {
      type: String,
      trim: true,
    },
    petUser: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    // pet: [        {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Pet',
    //   },
    // ],
  });
  
  const BookWalk = model('BookWalk', bookWalkSchema);
  
  module.exports = BookWalk;