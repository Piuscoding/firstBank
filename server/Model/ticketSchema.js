

const mongoose = require('mongoose');


const ticketSchema = new mongoose.Schema({
    
    subject: {
        type: String,
    },

    message:{
        type: String,
    },

    image:{
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

const Ticket = mongoose.model('ticket', ticketSchema);

module.exports = Ticket;