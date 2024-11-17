const express = require("express");
const user_route = express.Router(); // Use express.Router() to create a router instance
const bodyParser = require("body-parser");
const game_controller = require('../controllers/homeController');
const tournament_controller=require('../controllers/tournamentController')
const tournaent_entry_controller=require('../controllers/tournamentMoneyController')
user_route.use(bodyParser.json());
user_route.use(bodyParser.urlencoded({ extended: true }));
user_route.post('/addGame',game_controller.addGame)
user_route.get('/getGame',game_controller.getGame)
user_route.post('/addTournament',tournament_controller.addTournament)
user_route.get('/getTournament',tournament_controller.getTodayTournaments)
user_route.post('/addTournamentEntry',tournaent_entry_controller.addTournamentEntry)
user_route.get('/updateScoreTournament',tournaent_entry_controller.updateScoreByTransactionAndPhone)
module.exports = user_route;