

const mongoose = require('mongoose');


const widthdrawSchema = new mongoose.Schema({
    
    amount: {
        type: Number,
    },

    accName:{
        type:String
    },
    accNo:{
        type:Number
    },
    desc:{
        type: String,
        default: ""
    },
    image:{
        type:String
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

const Widthdraw = mongoose.model('widthdraw', widthdrawSchema);

module.exports = Widthdraw;