const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Contacts Directory and CRUD operations',
        description: 'Create, Retrieve, update, and delete any contact you desire.'
        },
        host:'https://ws341-contacts-project.onrender.com'
}
//https://ws341-contacts-project.onrender.com
//localhost:8080

const outputFile = './swagger-output.json';

const routes = ['./routes/index.js'];

swaggerAutogen(outputFile, routes, doc).then(async () => {
    await import('./app.js')
});