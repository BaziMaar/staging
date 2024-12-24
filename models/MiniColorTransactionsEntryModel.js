const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
    phone: {
        type: Number,
        required: true
    },
        color: {
            type: Number
        },
        size:{
            type: Number
        },
        number:{
            type:Number
        },
        amount: {
            type: Number
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        globalNumber:{
            type:Number
        },
        orignalNumber:{
            type:Number
        },
        transactionUpdated:{
            type:Number
        }
}, {
    timestamps: true // This will add createdAt and updatedAt fields to the schema
});

const ColorEntryTransaction = mongoose.model('MiniColorEntryTransaction', transactionSchema);

module.exports = ColorEntryTransaction;
