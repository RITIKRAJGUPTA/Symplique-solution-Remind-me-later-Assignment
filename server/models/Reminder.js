const mongoose = require('mongoose');

const reminderSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  message: { type: String, required: true },
  method: { type: String, enum: ['SMS', 'Email'], required: true },
  phone: { type: String, required: function() { return this.method === 'SMS'; } },
  email: { type: String, required: function() { return this.method === 'Email'; } },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Reminder', reminderSchema);