const express = require('express');
const router = express.Router();

const { getTransactions, createTransaction, createTransfer } = require('../controllers/transactionController');

router.get('/transactions', getTransactions);

router.post('/transfertransaction', createTransfer);

router.post('/transactions', createTransaction);

module.exports = router;