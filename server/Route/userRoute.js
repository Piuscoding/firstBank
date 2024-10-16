const express = require('express');
// const multer = require('multer');
const router = express.Router();

const userController = require('../controllers/userController');



router.get('/dashboard',userController.dashboardPage);

router.get('/transfer/:id',userController.navbarPage);
router.post('/transfer/:id',userController.navbarPage_Post );


router.get('/exchange_money/:id',userController.verifyPage);
router.post('/exchange_money/:id', userController.verifyPage_post);

router.get('/profile/:id',userController.accountPage);
router.get('/edit/:id',userController.editProfilePage);
router.post('/edit/:id',userController.editProfilePage_post);
router.get('/change_password/:id',userController.changePage);


router.get('/wire_transfer/:id',userController.livePage);
router.post('/wire_transfer/:id',userController.livePage_post);
router.get('/tradinghistory/:id', userController.tradingHistory)

router.get('/payment_request/:id',userController.upgradePage);
router.post('/payment_requests/:id',userController.upgradePage_post);

router.get('/paymentHistory/:id',userController.paymentHistoryPage);

router.get('/automatic_methods', userController.automaticPage);

router.get('/deGcash/:id', userController.GcashPage);
router.get('/dePay/:id', userController.PayPage);
router.get('/deMetro/:id', userController.MetroPage);
router.get('/deBdo/:id', userController.BdoPage);

router.get('/deposit', userController.depositPage);
router.post('/deposit/:id', userController.depositPage_post);
router.get('/depositHistory/:id',userController.depositHistory);

router.get('/redeem_gift_card/:id', userController.redeemPage);

router.get('/withPage/:id',userController.withPage);
router.get('/withdraw/:id',userController.widthdrawPage);
router.post('/withdraw/:id',userController.widthdrawPage_post);
router.get('/widthdrawHistory/:id',userController.widthdrawHistory);

router.get('/apply_loan/:id', userController.applyPage)
router.post('/apply_loan/:id', userController.applyPage_post)
router.get('/my_loans/:id', userController.myloansPage)

router.get('/calculator', userController.calculatorPage)
//***********************FIXED DEPOSIT****************** */
router.get('/fixed_deposits/:id', userController.fixedDeposits)
router.post('/fixed_deposits/:id', userController.fixedDeposits_post)
router.get('/fixed_depositsHistory/:id',userController.fixedDepositsHistory)

// **********************TICKET *******************//
router.get('/create_ticket/:id', userController.createTicket)
router.post('/create_ticket/:id', userController.createTicket_page)
router.get('/my_tickets/:id', userController.mytickets)

module.exports = router;

