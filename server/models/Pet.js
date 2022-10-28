const { Schema, model } = require("mongoose");

const petSchema = new Schema({
  petName: {
    type: String,
    required: true,
    trim: true,
  },
  petBreed: {
    type: String,
    required: true,
    trim: true,
  },
  petAge: {
    type: Number,
    required: true,
    trim: true,
  },
  petWeight: {
    type: Number,
    required: true,
    trim: true,
  },
  petInstruction: {
    type: String,
    required: false,
    trim: true,
    minlength: 1,
    maxlength: 280,
  },
  petEmergency: {
    type: String,
    required: false,
    trim: true,
    minlength: 1,
    maxlength: 280,
  },
  petUser: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Pet = model("Pet", petSchema);

module.exports = Pet;
