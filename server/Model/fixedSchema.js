

const mongoose = require('mongoose');


const fixedSchema = new mongoose.Schema({
    dePlan:{
        type: String,
    },
    amount: {
        type: Number,
    },
    currency:{
        type: String,
    },
    Return_Amount:{
        type: String,
        Default:"Loading"
    },
    Mature_Date:{
        type: String,
        default: "Loading"
    },
    remarks:{
       type: String
    },
    image:{
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

const FixedDeposit = mongoose.model('fixed', fixedSchema);

module.exports = FixedDeposit;