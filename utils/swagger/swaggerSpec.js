const config = require('../../config');

const swaggerJsDoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Simple social media API",
            version: "1.0.0",
            description: "Simple social media API as a test project. Author: Dmytro Bobyk"
        },
        baseDir: __dirname,
        servers: [
            {
                url: `${config.heroku_url}`
            },
            {
                url: `http://localhost:${config.port}`
            }
        ]
    },
    apis: ["./utils/swagger/routes/*.js", "./utils/swagger/*.js"]
};

const swaggerSpec = swaggerJsDoc(options);

module.exports = swaggerSpec;