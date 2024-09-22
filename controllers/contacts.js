const {getDb} = require("../db/connect");


//TODO: Make one location for error handling instead of repetitively writing error responses.

//Get ALL the Contacts - returned as an array
async function getContacts(req,res) {
    try {
        const _db = getDb();
        const contactCollection = _db.collection('contacts');
        const result = await contactCollection.find().toArray();

        if (result.length > 0) {
            res.status(200).send(result);
        } else {
            res.status(404).send('No Contacts Found');
        }
    } catch (err) {
        console.error("Error Fetching Data", err);
        res.status(500).send({error: 'Error Fetching Contacts'});
    }
}

// Grab Specific Contacts
async function getContactsById(req,res) {
    try {
        const _db = getDb();
        const contact = await _db.collection('contacts').findOne({_id:req.params.id});
        if (contact) {
            res.status(200).send(contact);
        } else {
            res.status(404).send('No Contacts Found');
        }
    } catch (err) {
        console.error("Error Fetching Data", err);
        res.status(500).send({error: 'Failed to fetch Contact'});
    }
}

module.exports = { getContacts, getContactsById };