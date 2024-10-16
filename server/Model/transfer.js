

const mongoose = require('mongoose');


const transferSchema = new mongoose.Schema({
    
    Bank: {
        type: String,
    },

    amount:{
        type:Number,
    },
    swiftCode:{
        type: String,
    },

    currency:{
        type: String,
    },
    accName:{
        type: String
    },
    accNo:{
        type:Number,
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

const transferMoney = mongoose.model('transferMoney', transferSchema);

module.exports = transferMoney;