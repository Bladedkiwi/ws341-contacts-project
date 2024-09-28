const express = require('express');
const contactController = require('../controllers/contacts');
const router = express.Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger-output.json');



//Base Route
router.get('/', (req, res) => {res.send('I am Alive!')});

//TODO Create contacts.js for the Contact routes - then possibly use Swagger to fix them? So maybe not yet.
//Contacts Routes
router.get('/contact', contactController.getAll);
router.post('/contact', contactController.addContact);
router.get('/contact/:id', contactController.getById);
router.put('/contact/:id', contactController.updateById);
router.delete('/contact/:id', contactController.deleteById);

//Development Debug Routes
router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

module.exports = router;