const mongoose = require('mongoose');
const PlinkoEntry = require('../models/PlinkoModel');
const Wallet=require('../models/walletModel');
const User=require('../models/userModel');


const generateController = (io) => {
    io.on('connection', (socket) => {
        console.log('A user connected:', socket.id);

        socket.on('savePlinkoData', async (data) => {
            try {
                const datas=JSON.stringify(data)
                const dataObj=JSON.parse(data)
                const plinkoData = new PlinkoEntry({
                    game:dataObj.game,
                    phone: Number(dataObj.phone), // Ensure phone is a number
                    time: dataObj.time, // Assuming time is already a string
                    bet: mongoose.Types.Decimal128.fromString(dataObj.bet.toString()), // Convert bet to Decimal128
                    payOut: mongoose.Types.Decimal128.fromString(dataObj.payOut.toString()), // Convert payOut to Decimal128
                    profit: mongoose.Types.Decimal128.fromString(dataObj.profit.toString()), // Convert profit to Decimal128
                    user_id: dataObj.user_id // Ensure user_id is a string
                });
                await plinkoData.save();
                io.emit('saveDataResponse', { status: 'success',data:dataObj });
                const user=User.findOne({phone:user_id});
                await user.save()
                user.wallet+=profit
            } catch (err) {
                io.emit('saveDataResponse', { status: 'error', error: err.message });
            }
        });

        socket.on('disconnect', () => {
            console.log('A user disconnected:', socket.id);
        });
    });
};

module.exports = {
    generateController,
};