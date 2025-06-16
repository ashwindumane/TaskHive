const mongoose = require('mongoose');


const taskSchema = new mongoose.Schema({
  title: String,
  priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Low' },
  dueDate: { type: Date },
  completed: { type: Boolean, default: false },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
},{ timestamps: true });

module.exports = mongoose.model('Task', taskSchema);
