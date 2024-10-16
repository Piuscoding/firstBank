

const mongoose = require('mongoose');


const loanSchema = new mongoose.Schema({
    
    loanType:{
        type: String,
    },
    currency:{
        type: String,
    },
    Fpayment:{
        type: String,
    },
    amount: {
        type: Number,
    },
    image: {
        type:String,
    },
    Total_Payable:{
    type: String,
    default: "Loading"
    },
    Amount_Paid:{
    type: String,
    default: "Loading"
    },

    Due_Amount:{
    type: String,
    default: "Loading"
    },
    Release_Date:{
     type: String,
     default: "Loading"  
    },
    desc:{
       type: String
    },
    remarks:{
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

const Loan = mongoose.model('loan', loanSchema);

module.exports = Loan;