require('dotenv').config();

const express = require('express');
const expressLayout = require('express-ejs-layouts');


const session =require('express-session');
const flash = require('connect-flash');




const connectDB = require('./server/config/db');
const req = require('express/lib/request');


const app = express();
const port = process.env.PORT || 5000;

// Connect to Database  
connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Static Files
app.use(express.static('public'));

// express session
app.use(
  session(
    {
      secret:'secret',
      resave:false,
      saveUninitialized:true,
      cookie:{
        maxAge:1000*60*60*24*7, // one week
      }
    }
  )
);

// connect-flash
app.use(flash());

// Templating Engine
app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

// Routes
app.use('/', require('./server/routs/customer'))

// Handle 404
app.get('*', (req, res) => {
  res.status(404).render('404');  
});

app.listen(port, ()=> {
  console.log(`App listeing on port ${port}`)
});