const mongoose = require("mongoose");

const autoSchema = new mongoose.Schema({
    auto_dt: {
        type: String,
        required: true
    },
    auto_color: {
        type: String,
        required:true
    },
    auto_spin:{
        type:String,
        require:true
    }
},{
    timestamps: true
});

const Auto = mongoose.model('Auto', autoSchema);

module.exports = Auto