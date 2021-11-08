const express = require('express');
const router = express.Router();

const { getAccounts, createAccount, updateAccount } = require('../controllers/accountController');

router.get('/accounts', getAccounts);

router.post('/accounts', createAccount);

router.put('/accounts', updateAccount);

module.exports = router;