const Reminder = require('../models/Reminder');

exports.createReminder = async (req, res) => {
  try {
    const { date, time, message, method, phone, email } = req.body;
    
    // Combine date and time into a single datetime object
    const reminderDateTime = new Date(`${date}T${time}`);
    
    const reminder = new Reminder({
      date: reminderDateTime,
      message,
      method,
      ...(method === 'SMS' ? { phone } : {}),
      ...(method === 'Email' ? { email } : {})
    });
    
    await reminder.save();
    res.status(201).json(reminder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};