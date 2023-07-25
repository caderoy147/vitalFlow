const bodyParser = require('body-parser');

// Middleware to parse JSON request bodies
const jsonParser = bodyParser.json({ limit: '10mb' }); // Adjust the limit as needed

module.exports = jsonParser;
