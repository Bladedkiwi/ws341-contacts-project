require('dotenv').config({path:'variables.env'});
const express = require('express');
const app = express();
const {connectToDatabase} = require("./db/connect");
const cors = require('cors');
const {urlencoded} = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');

/*******STARTING/SETTING UP APP CONNECTIONS*******/
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@${process.env.MONGO_URL}`

//Parse Incoming Requests, Set Headers, Set Route
app
    .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
    .use(express.json())
    .use(urlencoded({extended: true}))
    .use(cors())
    .use('/', require('./routes/index'));

//Establish a connection with mongoDB so requests can be handled
app.listen(process.env.PORT, async () => {
    console.log(`Server running on port ${process.env.PORT}`);
    await connectToDatabase(uri);
});
