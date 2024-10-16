

const mongoose = require('mongoose');


const paymentMoneySchema = new mongoose.Schema({
    
    amount: {
        type: Number,
    },
    sender:{
        type: Number,
    },

    receiver:{
        type: String,
    },

    currency:{
        type: String,
    },
    desc:{
       type: String
    },
    status: {
        type: String,
        default: 'pending'
    },

    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        // required: true
    }
}, {timestamps: true});

const paymentMoney = mongoose.model('payment', paymentMoneySchema);

module.exports = paymentMoney;