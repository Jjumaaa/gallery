const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

mongoose.set('strictQuery', false);

// Define routes
let index = require('./routes/index');
let image = require('./routes/image');

// Load env vars
const {
  username = process.env.MONGOUSER,
  userpassword = process.env.MONGOPASSWORD,
  mongocluster = process.env.MONGOHOST,
  prod_env = process.env.MONGOPRODUCTIONDATABASE,
} = process.env;

// MongoDB connection string
const mongoURI = `mongodb+srv://${username}:${userpassword}@${mongocluster}/${prod_env}?retryWrites=true&w=majority`;

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.error("MongoDB connection failed", err));

// Initialize the app
const app = express();

// View Engine
app.set('view engine', 'ejs');

// Public folder
app.use(express.static(path.join(__dirname, 'public')));

// Body parser
app.use(express.json());

// Routes
app.use('/', index);
app.use('/image', image);

// Port + host binding (Render needs 0.0.0.0)
const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(` Server is listening at http://0.0.0.0:${PORT}`);
  });
}

module.exports = app;
