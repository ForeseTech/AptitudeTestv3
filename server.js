const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db.js');
const userRoutes = require('./routes/userRoutes.js');
const questionRoutes = require('./routes/questionRoutes.js');
const adminRoutes = require('./routes/adminRoutes.js');
const timerRoutes = require('./routes/timerRoutes.js');
const { notFound, errorHandler } = require('./middleware/errorMiddleware.js');
const dotenv = require('dotenv');

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/question', questionRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/timer', timerRoutes);

app.use(notFound);
app.use(errorHandler);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send('API is running.....');
  });
}

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server is up and running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);
