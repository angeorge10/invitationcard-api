// Loads the configuration from config.env to process.env
require('dotenv').config({ path: './.env' });

const express=require('express');
const cookieParser = require('cookie-parser');
const swaggerUi = require('swagger-ui-express');
const bodyParser=require('body-parser');
const yamljs = require("yamljs");
const swaggerDocs = yamljs.load("./swaggerDocs/swagger.yaml");

const PORT = 3000;
const app=express();

const db = require("./src/models");
db.sequelize.sync();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(require('./src/routes/authentication.route'));
app.use(require('./src/routes/account.route'));

//Start express server
app.listen(PORT,()=>{
    console.log(`Server is running on port: ${PORT}`);
})