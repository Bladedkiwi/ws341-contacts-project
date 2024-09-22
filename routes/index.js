const express = require('express');
const {getContacts, getContactsById } = require('../controllers/contacts');
const router = express.Router();

//Base Route
router.get('/', (req, res) => {res.send('I am Alive!')});

//Contacts Routes
router.get('/contact', getContacts);
router.get('/contact/:id', getContactsById);

module.exports = router;