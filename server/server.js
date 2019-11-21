const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const connectDB = require('./config/mongoDB');
const errorHandler = require('./middleware/error');
const path = require('path');


dotenv.config({ path: './server/config/config.env' });

connectDB();

const PORT = process.env.PORT || 5000;

const app = express();

// body parser
app.use(express.json());


const auth = require('./routes/authRoute');
const order = require('./routes/orderRoute');

app.use('/', auth);
app.use('/', order );
app.use(errorHandler);

if (process.env.NODE_ENV === "production") {
  app.use(express.static('build'));

  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, "build", "index.html"));
  });
  
}

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  server.close(() => process.exit(1));
});
