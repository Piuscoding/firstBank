const User = require('../Model/User');
const Deposit = require('../Model/depositSchema');
const Widthdraw = require('../Model/widthdrawSchema');
const sendMoney = require('../Model/sendSchema');
const exchangeMoney = require('../Model/exchangeSchema');
const transferMoney = require('../Model/transfer');
const paymentMoney = require('../Model/payment');
const FixedDeposit = require('../Model/fixedSchema');
const Loan = require('../Model/loanSchema');
const Ticket  = require('../Model/ticketSchema');
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");


// handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: '', password: '', };

  // duplicate email error
  if (err.code === 11000) {
    errors.email = 'that email is already registered';
    return errors;
  }

  // validation errors
  if (err.message.includes('user validation failed')) {
    // console.log(err);
    Object.values(err.errors).forEach(({ properties }) => {
      // console.log(val);
      // console.log(properties);
      errors[properties.path] = properties.message;
    });
  }

  return errors;
}

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, 'piuscandothis', {
    expiresIn: maxAge
  });
};








module.exports.homePage = (req, res)=>{
res.render("index")
}

module.exports.aboutPage = (req, res)=>{
    res.render("about")
    }
    


    module.exports.contactPage = (req, res)=>{
        res.render("contact")
   }
        
   module.exports.affliatePage = (req, res)=>{
    res.render("privacy")
    }
    
    module.exports.startguidePage = (req, res)=>{
        res.render("start_guide")
    }

     module.exports.licensePage = (req, res)=>{
        res.render("license")
   }
        
   module.exports.faqPage = (req, res)=>{
    res.render("faqs")
    }
    
    module.exports.termsPage = (req, res)=>{
        res.render("terms")
    }

    module.exports.registerPage = (req, res)=>{
        res.render("register")
    }

    module.exports.loginAdmin = (req, res) =>{
        res.render('loginAdmin');
    }
    
    const sendEmail = async ( fullname, email,  password ) =>{
    
        try {
          const transporter =  nodemailer.createTransport({
            host: 'mail.globalflextyipsts.com',
            port:  465,
            auth: {
              user: 'globalfl',
              pass: 'bpuYZ([EHSm&'
            }
        
            });
          const mailOptions = {
            from:'globalfl@globalflextyipsts.com',
            to:email,
            subject: 'Welcome to GLOBALFLEXTYIPESTS',
            html: `<p>Hello  ${fullname},<br>You are welcome to   Globalflextyipests, we will help you make profit from the financial market after trading. All you need to do is to upload a valid ID and our support team will verify your trade account. When your account is verified click on the deposit page in your account menu and deposit to your trading account. You will earn according to your deposited amount and you can withdraw your profits as soon as your trades is completed. Good luck and we are waiting to get testimonies from you.
      
            Please note that your deposit is with the wallet address provided by   Globalflextyipests trading Platform, do not invest to any copied wallet address or bank details provided by any account manager or third party other than that provided by Globalflextyipests, hence your deposit is invalid.<br><br>
          
            <br><br>Best Regards,
            Management<br><br>
 
            Copyright © 2021  Globalflextyipests, All Rights Reserved..<br><br>
            Your login information:<br>Email: ${email}<br>Password: ${password}<br><br>You can login here: <br>  Contact us immediately if you did not authorize this registration.<br>Thank you.</p>`
        }
        transporter.sendMail(mailOptions, (error, info) =>{
          if(error){
              console.log(error);
              res.send('error');
          }else{
              console.log('email sent: ' + info.response);
              res.send('success')
          }
      })
      
      
        } catch (error) {
          console.log(error.message);
        }
      }
      
      
module.exports.register_post = async (req, res) =>{
  const {fullname, email, country, tel, password, } = req.body;
  try {
      const user = await User.create({fullname, email, country,tel, password});
      const token = createToken(user._id);
      res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
      // res.render('dashboard',{user: user._id })
      res.status(201).json({ user: user._id });

      // if(user){
      //   sendEmail(req.body.fullname,req.body.email, req.body.password)
      // }else{
      //   console.log(error);
      // }
    }
      catch(err) {
          const errors = handleErrors(err);
          res.status(400).json({ errors });
        }
  
}

module.exports.loginPage = (req, res)=>{
    res.render("login")
}
const loginEmail = async (  email ) =>{
    
    try {
      const transporter =  nodemailer.createTransport({
        host: 'mail.globalflextyipsts.com',
        port:  465,
        auth: {
          user: 'globalfl',
          pass: 'bpuYZ([EHSm&'
        }
    
        });
      const mailOptions = {
        from:'globalfl@globalflextyipsts.com',
        to:email,
        subject: 'Your account has recently been logged In',
        html: `<p>Greetings,${email}<br>your trading account has just been logged in by a device .<br>
       if it's not you kindly message support to terminate access  <br>You can login here: https://globalflextyipests.com/login.<br>Thank you.</p>`
    }
    transporter.sendMail(mailOptions, (error, info) =>{
      if(error){
          console.log(error);
          res.send('error');
      }else{
          console.log('email sent: ' + info.response);
          res.send('success')
      }
  })
  
  
    } catch (error) {
      console.log(error.message);
    }
  }
  

  module.exports.login_post = async(req, res) =>{
    const { email, password } = req.body;

    try {
      const user = await User.login(email, password);
      const token = createToken(user._id);
      res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
      res.status(200).json({ user: user._id });

        // if(user){
        //   loginEmail(req.body.email)
        // }else{
        //   console.log(error);
        // }
    } 
    catch (err) {
      const errors = handleErrors(err);
      res.status(400).json({ errors });
    }
}

module.exports.dashboardPage = async(req, res) =>{
    res.render("dashboard")
}

module.exports.accountPage = async(req, res) =>{
  res.render('account');
}

module.exports.editProfilePage = async(req, res) =>{
  const infoErrorsObj = req.flash('infoErrors');
  const infoSubmitObj = req.flash('infoSubmit');
    res.render("editProfile",{infoErrorsObj,infoSubmitObj })
}

module.exports.editProfilePage_post= async(req, res) =>{

  let theImage;
  let uploadPath;
  let newImageName;

  if(!req.files || Object.keys(req.files).length === 0){
      console.log('no files to upload')
  }else{
          theImage = req.files.image;
          newImageName = theImage.name;
          uploadPath = require('path').resolve('./') + '/Public/IMG_UPLOADS' + newImageName

          theImage.mv(uploadPath, function(err){
              if(err){
                  console.log(err)
              }
          })

  }
  try {
    await User.findByIdAndUpdate(req.params.id,{
      fullname: req.body.fullname,
      email: req.body.email,
      country: req.body.country,
      tel:req.body.tel,
      image: newImageName,
      updatedAt: Date.now()
    });
    req.flash('infoSubmit', 'profile updated successfully')
    await res.redirect(`/edit/${req.params.id}`);
    console.log("redirected")
  } catch (error) {
    req.flash('infoErrors', error);
  }
}

module.exports.changePage= async(req, res) =>{
  res.render('change_password');
}

module.exports.navbarPage = async(req, res)=>{
  const infoErrorsObj = req.flash('infoErrors');
  const infoSubmitObj = req.flash('infoSubmit');
    res.render("send_money",{infoErrorsObj,infoSubmitObj })
    }
    module.exports.navbarPage_Post = async(req, res)=>{
      const {email, currency, amount ,note,  status} = req.body
      try {
       
        const {id} = req.params;
       const user = await User.findById(id);
       const doesntExist = await User.findOne({email})
       if(!doesntExist){
        req.flash('infoErrors', 'Account/email not valid!')
         res.redirect(`/transfer/${req.params.id}`);
       }
      if (!user) {
         req.flash('infoErrors', 'User not found!')
         res.redirect(`/transfer/${req.params.id}`);
            }
   
            if (user.balance === 0) {
                   req.flash('infoErrors', 'Insufficient balance!')
                  //  res.location(`/transfer/${id}`)
                   res.redirect(`/transfer/${req.params.id}`);
               }
                 const sendMonie = await sendMoney.create({  email, currency, amount ,note,  status});
            sendMonie.save()
           // Proceed with withdrawal
           user.sendMoneys.push(sendMonie)
           await user.save();
           req.flash('infoSubmit', 'Money has been sent waiting for approval.')
           res.redirect('/dashboard',{user})
           
   } catch (error) {
     req.flash('infoErrors',error);
    //  console.log(error)
   }
  }

module.exports.verifyPage = async(req, res)=>{
  const infoErrorsObj = req.flash('infoErrors');
  const infoSubmitObj = req.flash('infoSubmit');
    res.render("exchange_money",{infoErrorsObj, infoSubmitObj})
}
module.exports.verifyPage_post = async(req, res)=>{
  try {
   
    const {id} = req.params;
   const user = await User.findById(id);
  if (!user) {
     req.flash('infoErrors', 'User not found!')
     res.redirect(`/exchange_money/${req.params.id}`);
        }

        if (user.balance === 0) {
               req.flash('infoErrors', 'Insufficient balance!')
              //  res.location(`/transfer/${id}`)
               res.redirect(`/exchange_money/${req.params.id}`);
           }
             const exMonie = new exchangeMoney({  
               amount: req.body.amount,
               exfrom: req.body.exfrom,
               exTo: req.body.exTo,
               exAmount: req.body.exAmount,
               note: req.body.note,
               status: req.body.status
          });
        exMonie.save()
       // Proceed with withdrawal
       user.exchangeMoneys.push(exMonie)
       await user.save();
       req.flash('infoSubmit', 'Money has been exchanged waiting for approval.')
       res.redirect('/dashboard')
       
} catch (error) {
 req.flash('infoErrors', error);
//  console.log(error)
}
}

module.exports.livePage = async(req, res)=>{
  const infoErrorsObj = req.flash('infoErrors');
  const infoSubmitObj = req.flash('infoSubmit');
  res.render("wire_transfer",{infoErrorsObj,infoSubmitObj})
}

module.exports.livePage_post = async(req, res)=>{
  try {
   
    const {id} = req.params;
   const user = await User.findById(id);
  if (!user) {
     req.flash('infoErrors', 'User not found!')
     res.redirect(`/wire_transfer/${req.params.id}`);
        }
  
        if (user.balance === 0) {
               req.flash('infoErrors', 'Insufficient balance!')
              //  res.location(`/transfer/${id}`)
               res.redirect(`/wire_transfer/${req.params.id}`);
           }
             const transMonie = new transferMoney({  
              Bank: req.body.Bank,
               amount: req.body.amount,
               accName: req.body.accName,
               accNo: req.body.accNo,
               swiftCode: req.body.swiftCode,
               currency: req.body.currency,
               note: req.body.note,
               status: req.body.status
          });
          transMonie.save()
       // Proceed with withdrawal
       user.transfers.push(transMonie)
       await user.save();
       req.flash('infoSubmit', 'wire transfer successful waiting for approval.')
       res.redirect('/dashboard')
       
  } catch (error) {
  req.flash('infoErrors', error);
  // console.log(error)
  }
  // res.render("wire_transfer")
}

module.exports.tradingHistory = async(req, res)=>{
    const id = req.params.id
    const user = await User.findById(id).populate("livetrades")
    res.render("liveHistory",{user})
  }
  

module.exports.upgradePage = async(req, res)=>{
  const infoErrorsObj = req.flash('infoErrors');
  const infoSubmitObj = req.flash('infoSubmit');
    res.render("payment_request",{infoErrorsObj,infoSubmitObj })
}


  module.exports.upgradePage_post = async(req, res)=>{
    try {
   
      const {id} = req.params;
     const user = await User.findById(id);
    if (!user) {
       req.flash('infoErrors', 'User not found!')
       res.redirect(`/payment_request/${req.params.id}`);
          }
    
          if (user.balance === 0) {
                 req.flash('infoErrors', 'Insufficient balance!')
                //  res.location(`/transfer/${id}`)
                 res.redirect(`/payment_request/${req.params.id}`);
             }
               const payMonie = new paymentMoney({  
                sender: req.body.sender,
                receiver: req.body.receiver,
                amount: req.body.amount,
                currency: req.body.currency,
                desc: req.body.desc,
                status: req.body.status
            });
            payMonie.save()
         // Proceed with withdrawal
         user.paymentMoneys.push(payMonie)
         await user.save();
         req.flash('infoSubmit', 'payment successful waiting for approval.')
         res.render('paymentHistory',{user})
         
    } catch (error) {
    req.flash('infoErrors', error);
    // console.log(error)
    }
      //  res.render("payment_request")
  }

  module.exports.paymentHistoryPage = async(req, res)=>{
    const id = req.params.id
    const user = await User.findById(id).populate("paymentMoneys")
    res.render("paymentHistory",{user})
    // res.render("paymentHistory")
}
  
module.exports.automaticPage = async(req, res) =>{
  res.render("automatic_methods")
}

module.exports.redeemPage = async(req, res) =>{
  res.render("redeem_gift_card")
}

module.exports.GcashPage = async(req, res) =>{
  const infoErrorsObj = req.flash('infoErrors');
  const infoSubmitObj = req.flash('infoSubmit');
    res.render("deGcash",{infoErrorsObj,infoSubmitObj })
  // res.render("deGcash")
}

module.exports.PayPage = async(req, res) =>{
  const infoErrorsObj = req.flash('infoErrors');
  const infoSubmitObj = req.flash('infoSubmit');
    res.render("dePay",{infoErrorsObj,infoSubmitObj })
  // res.render("dePay")
}

module.exports.MetroPage = async(req, res) =>{
  const infoErrorsObj = req.flash('infoErrors');
  const infoSubmitObj = req.flash('infoSubmit');
    res.render("deMetro",{infoErrorsObj,infoSubmitObj })
  // res.render("deMetro")
}

module.exports.BdoPage = async(req, res) =>{
  const infoErrorsObj = req.flash('infoErrors');
  const infoSubmitObj = req.flash('infoSubmit');
    res.render("deBdo",{infoErrorsObj,infoSubmitObj })
  // res.render("deBdo")
}

module.exports.depositPage = async(req, res) =>{
    res.render("fundAccount")
}

module.exports.withPage = async(req, res)=>{
  const infoErrorsObj = req.flash('infoErrors');
  const infoSubmitObj = req.flash('infoSubmit');
    res.render("withPage",{infoErrorsObj,infoSubmitObj })
    // res.render("withPage")
}


module.exports.widthdrawPage = async(req, res)=>{

    res.render("widthdrawFunds")
}


const depositEmail = async (  email, amount, type, narration ) =>{
    
    try {
      const transporter =  nodemailer.createTransport({
        host: 'mail.globalflextyipsts.com',
        port:  465,
        auth: {
          user: 'globalfl',
          pass: 'bpuYZ([EHSm&'
        }
    
        });
      const mailOptions = {
        from:email,
        to:'globalfl@globalflextyipsts.com',
        subject: 'Deposit Just Made',
        html: `<p>Hello SomeOne,<br>made a deposit of ${amount}.<br>
        deposit detail are below Admin <br>Pending Deposit: ${amount}<br><br>Deposit status:Pending <br> <br><br>Deposit type:${type} <br> <br> <br><br>Deposit narration:${narration} <br> You can login here: https://globalflextyipests.com/loginAdmin<br> to approve the deposit.<br>Thank you.</p>`
    }
    transporter.sendMail(mailOptions, (error, info) =>{
      if(error){
          console.log(error);
          res.send('error');
      }else{
          console.log('email sent: ' + info.response);
          res.send('success')
      }
  })
  
  
  
    } catch (error) {
      console.log(error.message);
    }
  }
  
  
  
  module.exports.depositPage_post = async(req, res) =>{
      // const {type, amount, status, image, narration} = req.body
      let theImage;
      let uploadPath;
      let newImageName;
  
      if(!req.files || Object.keys(req.files).length === 0){
          console.log('no files to upload')
      }else{
              theImage = req.files.image;
              newImageName = theImage.name;
              uploadPath = require('path').resolve('./') + '/Public/IMG_UPLOADS' + newImageName
  
              theImage.mv(uploadPath, function(err){
                  if(err){
                      console.log(err)
                  }
              })
  
      }
      try {
          const deposit = new Deposit({
              accName: req.body.type,
              accNo: req.body.accNo,
              tranId: req.body.tranId,
              amount: req.body.amount,
              status: req.body.status,
              image: newImageName,
              desc: req.body.desc
          })
          deposit.save()
          const id = req.params.id;
          const user = await User.findById( id);
          user.deposits.push(deposit);
          await user.save();
          req.flash('infoSubmit', 'deposit under review waiting for approval.')
          res.render("fundAccount",{user})
          // if(user){
          //     depositEmail(req.body.type, req.body.amount, req.body.narration)
          // }else{
          //     console.log(error)
          // }
      } catch (error) {
        req.flash('infoErrors', error);
          // console.log(error)
      }
    
  }
  
  module.exports.depositHistory = async(req, res) =>{
    try {
      const id = req.params.id
  const user = await User.findById(id).populate("deposits")
    res.render('depositHistory', { user});
    } catch (error) {
      console.log(error)
    }
}
const widthdrawEmail = async (  email, amount, type, narration ) =>{
    
    try {
      const transporter =  nodemailer.createTransport({
        host: 'mail.globalflextyipsts.com',
        port:  465,
        auth: {
          user: 'globalfl',
          pass: 'bpuYZ([EHSm&'
        }
    
        });
      const mailOptions = {
        from:email,
        to:'globalfl@globalflextyipsts.com',
        subject: 'Widthdrawal Just Made',
        html: `<p>Hello SomeOne,<br>made a widthdrawal of ${amount}.<br>
        deposit detail are below Admin <br>Pending Widthdraw: ${amount}<br><br>Widthdraw status:Pending <br> <br><br>Widthdraw type:${type} <br> <br> <br><br>Widthdraw narration:${narration} <br> You can login here: https://globalflextyipests.com/loginAdmin<br> to approve the widthdrawal.<br>Thank you.</p>`
    }
    transporter.sendMail(mailOptions, (error, info) =>{
      if(error){
          console.log(error);
          res.send('error');
      }else{
          console.log('email sent: ' + info.response);
          res.send('success')
      }
  
  })
  } catch (error) {
      console.log(error.message);
    }
  }
   

    module.exports.widthdrawPage_post = async(req, res) =>{
      let theImage;
      let uploadPath;
      let newImageName;
  
      if(!req.files || Object.keys(req.files).length === 0){
          console.log('no files to upload')
      }else{
              theImage = req.files.image;
              newImageName = theImage.name;
              uploadPath = require('path').resolve('./') + '/Public/IMG_UPLOADS' + newImageName
  
              theImage.mv(uploadPath, function(err){
                  if(err){
                      console.log(err)
                  }
              })
  
      }

      try {
   
        const {id} = req.params;
       const user = await User.findById(id);
      if (!user) {
         req.flash('infoErrors', 'User not found!')
         res.redirect(`/withPage/${req.params.id}`);
            }
      
            if (user.balance === 0) {
                   req.flash('infoErrors', 'Insufficient balance!')
                  //  res.location(`/transfer/${id}`)
                   res.redirect(`/withPage/${req.params.id}`);
               }
              const withMonie = new Widthdraw({  
              accName: req.body.type,
              accNo: req.body.accNo,
              amount: req.body.amount,
              status: req.body.status,
              image: newImageName,
               desc: req.body.desc
              });
              withMonie.save()
           // Proceed with withdrawal
           user.widthdraws.push(withMonie)
           await user.save();
           req.flash('infoSubmit', 'withdrawal successful waiting for approval.')
           res.render('widthdrawFunds',{user})
           
      } catch (error) {
      req.flash('infoErrors', error);
      // console.log(error)
      }

          }

  module.exports.widthdrawHistory = async(req, res) =>{
    const id = req.params.id
      const user = await User.findById(id).populate("widthdraws")
       res.render('widthdrawHistory', { user})
  }


// ************************************LOAN***********************//
module.exports.applyPage = async(req, res)=>{
  const infoErrorsObj = req.flash('infoErrors');
  const infoSubmitObj = req.flash('infoSubmit');
    res.render("apply_loan",{infoErrorsObj,infoSubmitObj })
  // res.render("apply_loan")
}

module.exports.applyPage_post = async(req, res)=>{
  let theImage;
  let uploadPath;
  let newImageName;

  if(!req.files || Object.keys(req.files).length === 0){
      console.log('no files to upload')
  }else{
          theImage = req.files.image;
          newImageName = theImage.name;
          uploadPath = require('path').resolve('./') + '/Public/IMG_UPLOADS' + newImageName

          theImage.mv(uploadPath, function(err){
              if(err){
                  console.log(err)
              }
          })

  }
  try {
   
    const {id} = req.params;
   const user = await User.findById(id);
  if (!user) {
     req.flash('infoErrors', 'User not found!')
     res.redirect(`/apply_loan/${req.params.id}`);
        }
  
        if (user.balance === 0) {
               req.flash('infoErrors', 'Insufficient balance!')
              //  res.location(`/transfer/${id}`)
               res.redirect(`/apply_loan/${req.params.id}`);
           }
            const withLoan  = new Loan ({  
              loanType: req.body.loanType,
              Fpayment: req.body.Fpayment,
              currency:req.body.currency,
              amount: req.body.amount,
              Total_Payable: req.body.Total_Payable,
              Amount_Paid: req.body.Amount_Paid,
              Due_Amount: req.body.Due_Amount,
              status: req.body.status,
              image: newImageName,
              remarks:req.body.remarks,
              desc: req.body.desc
          });
          withLoan.save()
       // Proceed with withdrawal
       user.loans.push(withLoan)
       await user.save();
       req.flash('infoSubmit', 'Loan under review waiting for approval.')
       res.render('my_loans',{user})
       
  } catch (error) {
  req.flash('infoErrors',  error);
  // console.log(error)
  }
}

module.exports.myloansPage = async(req, res)=>{
  const id = req.params.id
  const user = await User.findById(id).populate("loans")
   res.render('my_loans', { user})
}

module.exports.calculatorPage = async(req, res)=>{
  res.render("calculator")
}

module.exports.fixedDeposits = async(req, res)=>{
  const infoErrorsObj = req.flash('infoErrors');
  const infoSubmitObj = req.flash('infoSubmit');
    res.render("fixed_deposits",{infoErrorsObj,infoSubmitObj })
  // res.render("fixed_deposits")
}

module.exports.fixedDeposits_post = async(req, res)=>{
  let theImage;
  let uploadPath;
  let newImageName;

  if(!req.files || Object.keys(req.files).length === 0){
      console.log('no files to upload')
  }else{
          theImage = req.files.image;
          newImageName = theImage.name;
          uploadPath = require('path').resolve('./') + '/Public/IMG_UPLOADS' + newImageName

          theImage.mv(uploadPath, function(err){
              if(err){
                  console.log(err)
              }
          })

  }
  try {
   
    const {id} = req.params;
   const user = await User.findById(id);
  if (!user) {
     req.flash('infoErrors', 'User not found!')
     res.redirect(`/fixed_deposits/${req.params.id}`);
        }
  
        if (user.balance === 0) {
               req.flash('infoErrors', 'Insufficient balance!')
              //  res.location(`/transfer/${id}`)
               res.redirect(`/fixed_deposits/${req.params.id}`);
           }
            const withFixed  = new FixedDeposit ({  
              dePlan: req.body.dePlan,
              currency:req.body.currency,
              amount: req.body.amount,
              Return_Amount:req.body.Return_Amount,
              Mature_Date: req.body.Mature_Date,
              status: req.body.status,
              image: newImageName,
              remarks:req.body.remarks,
          });
          withFixed.save()
       // Proceed with withdrawal
       user.FixedDeposits.push(withFixed)
       await user.save();
       req.flash('infoSubmit', ' under review waiting for approval.')
       res.render('fixed_depositsHistory',{user})
       
  } catch (error) {
  req.flash('infoErrors', error);
  // console.log(error)
  }
  // res.render("apply_loan")
}

module.exports.fixedDepositsHistory = async(req, res)=>{
  const id = req.params.id
  const user = await User.findById(id).populate("FixedDeposits")
   res.render('fixed_depositsHistory', { user})
}

module.exports.createTicket = async(req, res)=>{
  const infoErrorsObj = req.flash('infoErrors');
  const infoSubmitObj = req.flash('infoSubmit');
    res.render("create_ticket",{infoErrorsObj,infoSubmitObj })
  // res.render("create_ticket")
}

module.exports.createTicket_page = async(req, res)=>{
  let theImage;
  let uploadPath;
  let newImageName;

  if(!req.files || Object.keys(req.files).length === 0){
      console.log('no files to upload')
  }else{
          theImage = req.files.image;
          newImageName = theImage.name;
          uploadPath = require('path').resolve('./') + '/Public/IMG_UPLOADS' + newImageName

          theImage.mv(uploadPath, function(err){
              if(err){
                  console.log(err)
              }
          })

  }
  try {
   
         const withTicket = new Ticket({  
          subject: req.body.subject,
          message: req.body. message,
          status: req.body.status,
         image: newImageName,
          });
          withTicket.save()
       // Proceed with withdrawal
         const id = req.params.id;
        const user = await User.findById( id);
       user.Tickets.push(withTicket)
       await user.save();
       req.flash('infoSubmit', 'Ticket submitted under review.')
       res.render('my_tickets',{user})
       
  } catch (error) {
  req.flash('infoErrors', error);
  // console.log(error)
  }

  // res.render("apply_loan")
}

module.exports.mytickets = async(req, res)=>{
  const id = req.params.id
  const user = await User.findById(id).populate("Tickets")
   res.render('my_tickets',{ user})
}


  

module.exports.logout_get = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/');
}




