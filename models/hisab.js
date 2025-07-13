const mongoose = require('mongoose');

const hisaabSchema =mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  encrypt: {
    type: Boolean,
    default: false
  },
  shareable: {
    type: Boolean,
    default: false
  },
  passcode: {
    type: String,
    default: ''
  },
  editable: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('hisaab', hisaabSchema);
