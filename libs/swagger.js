'use strict';
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

module.exports = (app) => {
    const swaggerSpec = swaggerJsdoc({
        definition: {
            info: {
                title: 'Node MongoDB Template',
                version: '1.0.0',
                description: 'A starter project for Node application written in Express framework with MongoDB accessible via mongoose'
            }
        },
        apis: ['./app/routes/index.js']
    });

    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
        explorer: true
    }));
};
