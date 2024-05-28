const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
    phone: {
        type: Number,
        required: true
    },
    transactions: [{
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
        }
    }]
}, {
    timestamps: true // This will add createdAt and updatedAt fields to the schema
});

const ColorTransaction = mongoose.model('ColorTransaction', transactionSchema);

module.exports = ColorTransaction;
