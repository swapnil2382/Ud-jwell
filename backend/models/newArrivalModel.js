const mongoose = require('mongoose');

const newArrivalSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: [true, 'An image URL is required'],
    trim: true,
  },
  altText: {
    type: String,
    required: [true, 'Alt text is required'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'A description is required'],
    trim: true,
  },
  title: {
    type: String,
    required: [true, 'A title is required'],
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const NewArrival = mongoose.model('NewArrival', newArrivalSchema);

module.exports = NewArrival;