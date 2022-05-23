const environment = process.env.NODE_ENV || "production"

if(environment === "production") {
    host = 'eyvqcfxf5reja3nv.cbetxkdyhwsb.us-east-1.rds.amazonaws.com';
    database = 'ozixnkc8z25cmlp5';
    username = 'dx6tau2kpabchw5m';
    password = 'o9yupzs8nrwg1kc1';
} else {
    host = 'localhost';
    database = 'shopify-production';
    username = 'cristina1';
    password= 'cristinAA$$33';    
}

const Sequelize = require('sequelize');
const config = new Sequelize( database, username, password, {dialect: 'mysql', host: host});

module.exports = config;