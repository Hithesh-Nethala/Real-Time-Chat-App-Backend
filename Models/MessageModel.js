const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true
    },
    users: Array, 
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'UserRegistration',
      required: true
    }
  },
  {
    timestamps: true 
  }
);

module.exports = mongoose.model('Messages', MessageSchema);