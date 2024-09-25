require('dotenv').config({path:'variables.env'});
const express = require('express');
const app = express();
const {connectToDatabase} = require("./db/connect");
const cors = require('cors');
const {urlencoded} = require('express');

/*******STARTING/SETTING UP APP CONNECTIONS*******/

//Parse Incoming Requests, Set Headers, Set Route
app.use(express.json())
    .use(urlencoded({extended: false}))
    .use(cors())
    .use('/', require('./routes/index'));

//Establish a connection with mongoDB so requests can be handled
app.listen(process.env.PORT, async () => {
    console.log(`Server running on port ${process.env.PORT}`);
    await connectToDatabase();
});
