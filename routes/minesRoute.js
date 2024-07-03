const express = require("express");
const mines_route = express.Router(); // Use express.Router() to create a router instance
const bodyParser = require("body-parser");
mines_route.use(bodyParser.json());
mines_route.use(bodyParser.urlencoded({ extended: true }));
const minesController=require('../controllers/minesController.js');
const { verifyDeviceId,getVerifyDeviceId } = require("../middlewares/verifyDeviceId.js");
mines_route.get('/getMines',getVerifyDeviceId, minesController.getMatrix);
mines_route.post('/sendMinesMoney',verifyDeviceId, minesController.sendMinesMoney);
mines_route.post('/receiveMinesMoney', verifyDeviceId,minesController.receiveMinesMoney);
mines_route.get(`/getReward`,minesController.getReward)
mines_route.get(`/getMinesEntry`,minesController.getMinesEntry)
mines_route.get(`/getMinesTrans`,minesController.getMinesTransactions)
module.exports = mines_route;
