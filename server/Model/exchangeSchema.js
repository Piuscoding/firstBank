

const mongoose = require('mongoose');


const exchangemoneySchema = new mongoose.Schema({
    
    amount: {
        type: Number,
    },
    exfrom:{
        type: String,
    },
    exTo:{
        type: String,
    },
    exAmount:{
        type: Number,
    },
    currency:{
        type: String,
    },
    note:{
    type: String,
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

const exchangeMoney = mongoose.model('exchangeMoney', exchangemoneySchema);

module.exports = exchangeMoney;