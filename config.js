const environment = process.env.NODE_ENV || "production"

if(environment === "production") {
    host = 'eyvqcfxf5reja3nv.cbetxkdyhwsb.us-east-1.rds.amazonaws.com';
    database = 'jub3ebbn7a9ui09k';
    username = 'z555882molusdtz9';
    password= 'cjo1prpgzr040lq4';
} else {
    host = 'localhost';
    database = 'shopify-production';
    username = 'cristina1';
    password= 'cristinAA$$33';    
}

const Sequelize = require('sequelize');
const config = new Sequelize( database, username, password, {dialect: 'mysql', host: host});

module.exports = config;