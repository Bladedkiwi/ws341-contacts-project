const {getDb} = require("../db/connect");
const {ObjectId} = require("mongodb");

//TODO Create HTTP Requests for these and update
//TODO: Make one location for error handling instead of repetitively writing error responses.

//Get ALL the Contacts - returned as an array
async function getAll(req,res) {
    try {
        const data = await getDb().find().toArray();
        if (data.length > 0) {
            res.status(200).send(data);
        } else {
            res.status(404).send('No Contacts Found');
        }
    } catch (err) {
        console.error("Error Fetching Data", err);
        res.status(500).send({error: 'Error Fetching Contacts'});
    }
}

// Grab Specific Contacts
async function getById(req,res) {
    try {
        const _db = getDb();
        // Find Contact by their ID
        const contact = await _db.findOne({ "_id": new ObjectId(req.params.id) });
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

/* Update Contact
-find one by ID
-update it
- check that it is updated
-throw error if not
* */
async function updateById(req,res) {
    try {
        // Find Contact and Update by ID
        // const contact = await getDb().collection('contacts').findOneAndUpdate({ "_id": new ObjectId(req.params.id)});
        const _db = await getDb();

        //Prepare contact to update
        //Check whether a field needs updated and adjust
        const requests = {
            ...(req.body.birthday !== null && req.body.birthday !== undefined && { birthday: req.body.birthday }),
            ...(req.body.email !== null && req.body.email !== undefined && { email: req.body.email }),
            ...(req.body.favoriteColor !== null && req.body.favoriteColor !== undefined && { favoriteColor: req.body.favoriteColor }),
            ...(req.body.firstName !== null && req.body.firstName !== undefined && { firstName: req.body.firstName }),
            ...(req.body.lastName !== null && req.body.lastName !== undefined && { lastName: req.body.lastName })
        }
        //Update Contact by searching for the ID
        const contact = await _db.findOneAndUpdate({ _id: new ObjectId(req.params.id) }, {$set: requests}, { upsert: true}, {returnDocument: "after"});

        //Check that contact is good to go and send success message
        if (contact._id) {
        res.status(200).send("Contact Successfully Updated");
        } else {
            res.status(404).send('Delete Contact Failed');
        }
    } catch (err) {
        console.error("Error Fetching Data", err);
        res.status(500).send({error: 'Failed Fetching Data for Deletion'});
    }
}

// Add Contact
async function addContact(req,res) {
    try {
        const _db = await getDb();

        console.log('Arrived at the post stage on the function')
        // The Contact base template with requested values
        const newContact =
        {
            birthday: req.body.birthday,
            email: req.body.email,
            favoriteColor: req.body.favoriteColor,
            firstName: req.body.firstName,
            lastName: req.body.lastName
        }


        //Grab the collection we want to insert a contact into
        const contact = await _db.insertOne(newContact);

        //Checking if contact and _db exist, then returning them along with the given parameters for the ID
        if (contact) {
            res.status(200).send(contact.insertedId);
        } else {
            res.status(404).send('Contact could not be inserted into DB');
        }
    } catch (err) {
        console.error("Error Fetching Data", err);
        res.status(500).send({error: 'Failed Adding Contact'});
    }
}

// Delete Contact
async function deleteById(req,res) {
    try {
        const _db = await getDb();
        // Find Contact by their ID
        // const contact = await _db.collection('contacts').deleteOne({ "_id": new ObjectId(req.params.id) });
        _db.deleteOne({ _id: new ObjectId(req.params.id) });
        if (_db) {
            res.status(200).send(await _db.find().toArray());
        } else {
            res.status(404).send('No Contacts Found');
        }
    } catch (err) {
        console.error("Error Fetching Data", err);
        res.status(500).send({error: 'Failed Fetching Data for Deletion'});
    }
}

module.exports = { getAll, getById, updateById, addContact, deleteById };