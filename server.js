// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();

const bodyParser = require('body-parser')
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8000;
const server = app.listen(port, listening);
function listening(){
    console.log(`running on localhost: ${port}`);
  };
const data = [];
  // GET route
  app.get('/all', function(req, res) {
    res.send(data)
  })

// POST Route
  app.post('/addPost', function(req, res) {
    let newData = req.body;
    let newEntry = {
      location: newData.loc,
      temperature: newData.temperature,
      date: newData.date,
      feel: newData.feel,
    }
    data.unshift(newEntry);
    console.log(newEntry);
  })
