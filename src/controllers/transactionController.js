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