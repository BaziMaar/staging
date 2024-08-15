const mongoose = require('mongoose');
const PlinkoEntry = require('../models/PlinkoModel');

const generateController = (io) => {
    io.on('connection', (socket) => {
        console.log('A user connected:', socket.id);

        socket.on('savePlinkoData', async (dataObjParse) => {
            try {
                const dataObjs=JSON.parse(dataObjParse)
                const dataObj=JSON.stringify(dataObjs)
                

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
