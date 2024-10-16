
const express = require('express');

const router = express.Router();

const adminController = require('../controllers/adminController');

//************************************* */  Admin Dashboard  routes**********************//

router.get('/adminRoute',adminController.adminPage );

router.get("/adminnavbarPage", adminController.adminNavbarPage)

router.get('/viewUser/:id',adminController.viewUser );

router.get('/editUser/:id',adminController.editUser );

router.post('/editUser/:id', adminController.editUser_post);

// //************************************* */ All Deposits  routes**********************//

router.get('/allFunding',adminController.allDeposit );

router.get('/viewDeposit/:id',adminController.viewDeposit );

// router.get('/editDeposit/:id',adminController.editDeposit);

// router.put('/editDeposit/:id',adminController.editDeposit_post );

// //************************************* */ All Widthdrawals  routes**********************//

router.get('/allWidthdrawals',adminController.allWidthdrawal );

router.get('/viewWidthdrawals/:id',adminController.viewWidthdrawal );

// router.get('/editWidthdrawals/:id',adminController.editWidthdrawal );
// router.put('/editWidthdrawals/:id',adminController.editWidthdrawal_post );

// //************************************* */ All Verification routes**********************//
router.get('/Allexchange',adminController.allVerification );
router.get('/viewExchange/:id',adminController.viewVerify);

// //************************************* */ All live trades routes**********************//
router.get("/allTransfer", adminController.alllivetradePage)
router.get("/viewTransfer/:id", adminController.viewlivetradePage)


// //************************************* */ All Account Upgrades routes**********************//
router.get("/Allpayment", adminController.allupgradesPage)
router.get("/viewpayment/:id", adminController.viewUprgadesPage)
router.get("/editpayment/:id", adminController.editUpgradesPage);
router.post('/editpayment/:id',adminController.editUpgrade_post );

// ***********************************LOAN**************************************//
router.get("/allLoans", adminController.allLoanPage)
router.get("/viewLoans/:id", adminController.viewLoansPage)
router.get("/editLoans/:id", adminController.editLoansPage);
router.post('/editLoans/:id',adminController.editLoans_post );

// ***********************************FIXED-DEPOSIT**************************************//
router.get("/allFixed", adminController.allFixedPage)
router.get("/viewFixed/:id", adminController.viewFixedPage)
router.get("/editFixed/:id", adminController.editFixedPage);
router.post('/editFixed/:id',adminController.editFixed_post );

// ***********************************TICKET**************************************//
router.get("/allTickets", adminController.allTTicketPage)
router.get("/viewTickets/:id", adminController.viewTicketPage)
router.get("/editTickets/:id", adminController.editTicketPage);
router.post('/editTickets/:id',adminController.editTicket_post );


// //************************************* */ All Delete routes**********************//
router.post('/deleteUser/:id', adminController.deletePage);
router.post('/deleteDeposit/:id', adminController.deleteDeposit);
router.post('/deleteWidthdrawal/:id', adminController.deleteWidthdraw)
router.post('/deleteExchange/:id', adminController.deleteVerification)
router.post("/deleteTransfer/:id", adminController.deleteLivetrade)
router.post("/deletepayment/:id", adminController.deleteUpgrade)
router.post('/deleteLoans/:id',adminController.deleteLoans );
router.post('/deleteFixed/:id',adminController.deleteFixed );
router.post('/deleteTickets/:id',adminController.deleteTicket );


module.exports = router;
