const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
app.use(express.json());

// Import routes
const userRoutes = require('./routes/route');
const flatRoutes = require('./routes/route');
const messageRoutes = require('./routes/route');

// Use routes
app.use('/users', userRoutes);
app.use('/flats', flatRoutes);
app.use('/flats', messageRoutes); // messages are nested under flats

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(process.env.PORT || 5000, () => console.log('Server running')))
  .catch(err => console.log(err));
