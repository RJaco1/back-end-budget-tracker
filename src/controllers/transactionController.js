const Transaction = require('../models/transactionModel');

module.exports.getTransactions = (req, res, next) => {
    const args = [req.user.uid];
    Transaction.fetchAll(args)
        .then(({ rows }) => { res.status(200).json({ valid: true, data: rows }) })
        .catch((e) => { res.status(400).json({ valid: false, message: e }) });
}

module.exports.createTransaction = (req, res, next) => {
    const args = [req.body.amount, req.body.transaction_date, req.body.category_id, req.body.account_id, req.user.uid];
    Transaction.create(args)
        .then(() => { res.status(201).json({ valid: true, message: 'new transaction created' }) })
        .catch((e) => { res.status(400).json({ valid: false, message: e }) });
}

module.exports.createTransfer = (req, res, next) => {
    const argsOut = [req.body.outcomeTransfer.amount, req.body.outcomeTransfer.transaction_date,
    req.body.outcomeTransfer.catOutcomeId, req.body.outcomeTransfer.origin_account, req.user.uid];

    const argsIn = [req.body.incomeTransfer.amount, req.body.incomeTransfer.transaction_date,
    req.body.incomeTransfer.catIncomeId, req.body.incomeTransfer.destination_account, req.user.uid];

    Transaction.createTransfer(argsOut, argsIn)
        .then(() => { res.status(201).json({ valid: true, message: 'new transfer created' }) })
        .catch((e) => { res.status(400).json({ valid: false, message: e }) });
}

module.exports.filterbyAccountorCategory = (req, res, next) => {
    const args = [req.params.account, req.params.category, req.user.uid];
    Transaction.filterbyAccountorCategory(args)
        .then(({ rows }) => { res.status(200).json({ valid: true, data: rows }) })
        .catch((e) => { res.status(400).json({ valid: false, message: e }) });
}

module.exports.filterbyAccountAndCategory = (req, res, next) => {
    const args = [req.params.account, req.params.category, req.user.uid];
    Transaction.filterbyAccountandCategory(args)
        .then(({ rows }) => { res.status(200).json({ valid: true, data: rows }) })
        .catch((e) => { res.status(400).json({ valid: false, message: e }) });
}

module.exports.filterbyDate = (req, res, next) => {
    const args = [req.params.account, req.params.category, req.params.date, req.user.uid];
    Transaction.filterdate(args)
        .then(({ rows }) => { res.status(200).json({ valid: true, data: rows }) })
        .catch((e) => { res.status(400).json({ valid: false, message: e }) });
}

module.exports.filterbyAccountorCategoryandDate = (req, res, next) => {
    const args = [req.params.account, req.params.category, req.params.date, req.user.uid];
    Transaction.filterAccountorCategoryandDate(args)
        .then(({ rows }) => { res.status(200).json({ valid: true, data: rows }) })
        .catch((e) => { res.status(400).json({ valid: false, message: e }) });
}

module.exports.filterbyDateOnly = (req, res, next) => {
    const args = [req.params.date, req.user.uid];
    Transaction.filterbyDate(args)
        .then(({ rows }) => { res.status(200).json({ valid: true, data: rows }) })
        .catch((e) => { res.status(400).json({ valid: false, message: e }) });
}

module.exports.getAccountsBalance = (req, res, next) => {
    const args = [req.user.uid];
    Transaction.accountsBalance(args)
        .then(({ rows }) => { res.status(200).json({ valid: true, data: rows }) })
        .catch((e) => { res.status(400).json({ valid: false, message: e }) });
}

module.exports.getTransactionsTrend = (req, res, next) => {
    const args = [req.params.accountid, req.user.uid];
    Transaction.transactionsTrend(args)
        .then(({ rows }) => { res.status(200).json({ valid: true, data: rows }) })
        .catch((e) => { res.status(400).json({ valid: false, message: e }) });
}

module.exports.getAccountTotal = (req, res, next) => {
    const args = [req.params.accountid, req.user.uid];
    Transaction.accountTotal(args)
        .then(({ rows }) => { res.status(200).json({ valid: true, data: rows }) })
        .catch((e) => { res.status(400).json({ valid: false, message: e }) });
}