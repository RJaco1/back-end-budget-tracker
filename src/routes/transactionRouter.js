const express = require('express');
const router = express.Router();

const { getTransactions, createTransaction, createTransfer, filterbyAccountorCategory, filterbyAccountAndCategory, filterbyDate, filterbyAccountorCategoryandDate, filterbyDateOnly } = require('../controllers/transactionController');

router.get('/transactions', getTransactions);

router.get('/accountorcategoryanddate/:account/:category/:date', filterbyAccountorCategoryandDate);

router.get('/dateonly/:date', filterbyDateOnly);

router.get('/filteraccountandcategoryanddate/:account/:category/:date', filterbyDate);

router.get('/filteraccountandcategory/:account/:category', filterbyAccountAndCategory);

router.get('/filteraccountcategory/:account/:category', filterbyAccountorCategory);

router.post('/transfertransaction', createTransfer);

router.post('/transactions', createTransaction);

module.exports = router;