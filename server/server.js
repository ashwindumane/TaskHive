const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authMiddleware = require('./middleware/authMiddleware');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require( './routes/taskRoutes.js');
const PORT = process.env.PORT || 5000;

dotenv.config();
const app = express();

app.use(cors({
  origin: ['http://localhost:5173', 'https://taskverse-phi.vercel.app/'], 
  credentials: true,
}));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/tasks', authMiddleware, taskRoutes);
app.get("/", (req, res) => {
  res.send("Backend is running 🎉");
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log('Server running on port ${PORT}'));
  })
  .catch(err => console.error(err));
