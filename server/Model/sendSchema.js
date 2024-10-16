

const mongoose = require('mongoose');


const sendmoneySchema = new mongoose.Schema({
    
    amount: {
        type: Number,
        // default: 0
    },

    email:{
        type: String,
    },

    currency:{
        type: String,
    },
    note:{
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

const sendMoney = mongoose.model('sendMoney', sendmoneySchema);

module.exports = sendMoney;