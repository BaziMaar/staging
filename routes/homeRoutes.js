const express = require("express");
const user_route = express.Router(); // Use express.Router() to create a router instance
const bodyParser = require("body-parser");
const game_controller = require('../controllers/homeController');
user_route.use(bodyParser.json());
user_route.use(bodyParser.urlencoded({ extended: true }));
user_route.post('/addGame',game_controller.addGame)
user_route.get('/getGame',game_controller.getGame)

module.exports = user_route;