const { Decimal128 } = require("mongodb");
const mongoose = require("mongoose");

const SliceSchema = new mongoose.Schema({
    game:{
        type:String,
        required:true
    },
    phone: {
        type: String,
        required:true
    },
    time: {
        type: String,
        required:true
    },
    bet: {
        type: Decimal128,
        required:true
    },
    payOut: {
        type: Decimal128,
        required:true
    },
    profit:{
        type:Decimal128,
        required:true
    },user_id:{
        type:String,
        required:true
    }
}, {
    timestamps: true // This will add createdAt and updatedAt fields to the schema
});

const SliceEntry= mongoose.model('SliceEntry', SliceSchema);

module.exports = SliceEntry