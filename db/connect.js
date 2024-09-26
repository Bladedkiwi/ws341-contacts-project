const MongoClient = require('mongodb').MongoClient;

let _db;
//Connecting to the DB first so that it's ready to go.
//Establishing the connection with MONGO DB
async function connectToDatabase(uri) {
    const client = new MongoClient(uri);
    //Trying the connection
    try {
        await client.connect();
        console.log("Connected to MongoDB");

        // Storing USERS DB -> Contacts
        _db = client.db('users').collection('contacts');

    } catch (err) {
        console.error("Failed to connect to MongoDB: ", err);
        throw err;
    }
}

const getDb = () => {
    if (!_db) {
        throw new Error('Database not connected.');
    }
    return _db; // Return the db instance
}



module.exports = {connectToDatabase , getDb};