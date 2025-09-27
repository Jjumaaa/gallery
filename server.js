const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');


require('dotenv').config();


// Define routes
let index = require('./routes/index');
let image = require('./routes/image');

// connecting the database
// let mongodb_url = 'mongodb://localhost:27017/';
// let dbName = 'darkroom';
// mongoose.connect(`${mongodb_url}${dbName}`,{ useNewUrlParser: true , useUnifiedTopology: true }, (err)=>{
//     if (err) console.log(err)
// });

const {username = process.env.MONGOUSER,
    userpassword = process.env.MONGOPASSWORD,
    mongocluster = process.env.MONGOHOST,
    prod_env = process.env.MONGOPRODUCTIONDATABASE,} = process.env;

//mongoose.connect(`mongodb+srv://${username}:${userpassword}@${mongocluster}/${prod_env}?retryWrites=true&w=majority`,{ useNewUrlParser: true , useUnifiedTopology: true })

const mongoURI = `mongodb+srv://${username}:${userpassword}@${mongocluster}/${prod_env}?retryWrites=true&w=majority`

// test if the database has connected successfully
mongoose.connect(mongoURI, { useNewUrlParser: true , useUnifiedTopology: true })
.then(() => console.log('MongoDB connected...'))
.catch(err => console.log("MongoDB connection failed", err));

// Initializing the app
const app = express();


// View Engine
app.set('view engine', 'ejs');

// Set up the public folder;
app.use(express.static(path.join(__dirname, 'public')));

// body parser middleware
app.use(express.json())


app.use('/', index);
app.use('/image', image);



 
const PORT = process.env.PORT || 5000;
app.listen(PORT,() =>{
    console.log(`Server is listening at http://localhost:${PORT}`)
});

module.exports = app;