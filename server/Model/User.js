const mongoose = require('mongoose');
const  validator  = require('validator');
// const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({

    fullname:{
        type: String,
    },
    tel:{
        type: String,
    },
    email:{
        type: String,
        unique: true,
        lowercase: true,
        required: validator.isEmail['Please enter an email']
        // required:  [isEmail, 'Please enter an email']
    },
    country:{
        type: String
    },
 
    password:{
        type: String,
    },
    image:{
        type: String,
        default: "/profile/default.png"
    },
    accNo:{
        type: String,
        default: "Loading"
    }, 
    balance:{
        type: Number,
        default: 0
    }, 
    BRLbalance:{
        type: Number,
        default: 0
    },
    INRbalance:{
        type: Number,
        default: 0
    },
    ZARbalance:{
        type: Number,
        default: 0
    },
    CADbalance:{
        type: Number,
        default: 0
    },
    AEDbalance:{
        type: Number,
        default: 0
    },
    KWDbalance:{
        type: Number,
        default:0
    },
    MXNbalance:{
        type: Number,
        default:0
    },
    Yenbalance:{
        type: Number,
        default: 0
    },
    EURbalance:{
        type: Number,
        default: 0
    },
    PHPbalance:{
        type: Number,
        default: 0
    },
   
    totalTicket:{
        type: Number,
        default: 0
    },
    totalPay:{
        type: Number,
        default: 0
    },
    totalLoan:{
        type: Number,
        default: 0
    },

    totalFixed:{
        type: Number,
        default: 0
    },
    exchangeMoneys: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'exchangeMoney'
    },
    sendMoneys: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'sendMoney'
    },
    transfers:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'transferMoney'
    },
    paymentMoneys:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'payment'
    },
    loans:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'loan'
    },
    FixedDeposits:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'fixed'
    },
    Tickets:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'ticket'
    },
    deposits:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'deposit'
    },

    widthdraws:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'widthdraw'
    },
    role:{
        type: Number,
        default: 0
    }
},{timestamps: true})

// static method to login user
userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({ email });
    if (user) {
      const auth = await (password, user.password);
      if (auth) {
        return user;
      }
      throw Error('incorrect password');
    }
    throw Error('incorrect email');
  };
  

const User = mongoose.model('user', userSchema)

module.exports = User;
