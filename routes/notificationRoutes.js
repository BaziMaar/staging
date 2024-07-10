const express = require("express");
const notification_route = express.Router(); // Use express.Router() to create a router instance
const bodyParser = require("body-parser");
notification_route.use(bodyParser.json());
notification_route.use(bodyParser.urlencoded({ extended: true }));
const notificationController=require('../controllers/notificationController.js');
const { verifyDeviceId,getVerifyDeviceId } = require("../middlewares/verifyDeviceId.js");
notification_route.post('/send', verifyDeviceId,notificationController.sendNotification);

module.exports = notification_route;