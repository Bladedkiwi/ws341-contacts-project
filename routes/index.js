const express = require('express');
const {getContacts, getContactsById } = require('../controllers/contacts');
const router = express.Router();

//Contacts Routes
router.get('/', getContacts);
router.get('/:id', getContactsById);

module.exports = router;