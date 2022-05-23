const express = require('express');
const app = express();
const config = require('./config');
const Item = require('./Models/Item');
const fetch = require('node-fetch');
require('dotenv').config();

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static(__dirname + '/frontend'))


//create database connection
config.authenticate().then(function(){
    console.log('Database is connected');
}).catch(function(err){
    console.log(err);
});

//retrieve weather data
app.get('/city/:apiRoute', async(req,res) => {
    const api_key = process.env.API_KEY
    try {
        const { apiRoute } = req.params
        const  apiResponse = await fetch(
            `http://api.openweathermap.org/data/2.5/weather?q=${apiRoute}&APPID=${api_key}`
        )
        const apiResponseJson = await apiResponse.json()
    res.send(`${apiResponseJson.weather[0].description} and ${Math.round(apiResponseJson.main.temp - 273.15)}&deg`)
  } catch (err) {
    console.log(err)
    res.status(500).send('Something went wrong')
    }
})


//retrieve all inventory items
app.get('/items', function(req,res){
    Item.findAll().then(function(result){
        res.send(result);
    }).catch(function(err){
        res.send(err);
    });
});

//Edit name, category, quantity, description, and location of an item
app.post('/items/:itemId', function(req,res){
    var itemId = req.params.itemId;
    Item.findByPk(itemId).then(function(result){
        if(result){
            if (req.body.itemName !== ""){
                result.itemName = req.body.itemName;
            }
            if (req.body.itemCategory !== ""){
                result.itemCategory = req.body.itemCategory;
            }
            if (req.body.quantity !== "0"){
                result.quantity = req.body.quantity;
            }
            if (req.body.itemDescription !== ""){
                result.itemDescription = req.body.itemDescription;
            }
            if (req.body.location !== ""){
                result.location = req.body.location;
            }
            result.save().then(function(){
                res.redirect(req.get('referer'));
            }).catch(function(err){
                res.send(err);
            });
        } else {
            res.send('Item ID does not exist')
        }
    }).catch(function(err){
        res.send(err);
    });
});

//Create a new item
app.post('/items', function(req,res){
    const newItem = {
        itemName: req.body.itemName,
        itemCategory: req.body.itemCategory,
        quantity: req.body.quantity,
        itemDescription: req.body.description,
        location: req.body.location
    }
    Item.create(newItem).then(function(result){
        res.redirect(req.get('referer'));
    }).catch(function(err){
        res.send(err);
    });
});

//Delete an item
app.delete('/:itemId', function(req,res){
    var itemId = req.params.itemId;
    Item.findByPk(itemId).then(function(result){
        if(result){
            result.destroy().then(function(){
                res.redirect(req.get('referer'));
            }).catch(function(err){
                res.send(err);
            });
        } else {
            res.send('Task not found');
        };
    }).catch(function(err){
        res.send(err);
    });
});

app.listen(process.env.PORT || 3000, function(){
    console.log("server is running on port 3000");
});