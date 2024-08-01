const mongoose = require("mongoose");

const autoSchema = new mongoose.Schema({
    auto_dt: {
        type: Boolean,
        required: true
    },
    auto_color: {
        type: Boolean,
        required:true
    },
    auto_spin:{
        type:Boolean,
        require:true
    }
},{
    timestamps: true
});

const Auto = mongoose.model('Auto', autoSchema);

module.exports = Auto