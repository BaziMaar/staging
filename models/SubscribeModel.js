var mongoose = require('mongoose');

var subscribeSchema = mongoose.Schema({
    order_id: {
        type: String,
        required: true
    },
    customer_email:{
        type:String,
        required:true
    },
    txn_date:{
        type:Number,
        required:true
    },
    txn_amount:{
        type:String,
        required:true
    }
},
{ timestamps: true });

module.exports = mongoose.model('Subscribe', subscribeSchema);