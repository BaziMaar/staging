const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
    phone: {
        type: Number,
        required: true
    },
    transactions: [{
        color: {
            type: Number,
            required: true
        },
        size:{
            type: Number,
            required:true
        },
        number:{
            type:Number,
            required:true
        },
        amount: {
            type: Number,
            required: true
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
