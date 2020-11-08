// 1-  Setup empty JS object to act as endpoint for all routes
const projectData = {};

// 2-  Require Express to run server and routes
const express = require('express');

// 3- Start up an instance of app
const app = express();

// 4- Dependencies
const bodyParser = require('body-parser');

/*  5- Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// 6- Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// 7- Initialize the main project folder
app.use(express.static('website'));

// 8- Spin up the server
const port = 8000;
const server = app.listen(port, listening);

function listening(){
    console.log('server running ......');
    console.log(`running on localhost :: ${port}`);
};


// 9- Post Route
app.post('/add_temp', add_temp)

function add_temp(request, response){
    const new_entry ={
        temp:request.body.temp,
        zip_value: request.body.zip_value
    }
    projectData.temp=new_entry.temp;
    projectData.zip_value=new_entry.zip_value;
    response.send(projectData)
}

// 10- Callback function to complete GET '/all'
app.get('/all', return_temp)
function return_temp(request, response){
    response.send(projectData);
}