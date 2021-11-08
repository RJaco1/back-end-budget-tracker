const Account = require('../models/accountModel');

module.exports.getAccounts = (req, res, next) => {
    const args = [req.user.uid];
    Account.fetchAll(args)
        .then(({ rows }) => { res.status(200).json({ valid: true, data: rows }) })
        .catch((e) => { res.status(400).json({ valid: false, message: e }) });
}

module.exports.createAccount = (req, res, next) => {
    const args = [req.body.account_name, req.user.uid]
    Account.create(args)
        .then(() => { res.status(201).json({ valid: true, message: 'new account created' }) })
        .catch((e) => { res.status(400).json({ valid: false, message: e }) });
};

module.exports.updateAccount = (req, res, next) => {
    const args = [req.body.account_name, req.body.account_id, req.user.uid]
    Account.update(args)
        .then(() => { res.status(200).json({ valid: true, message: 'new account created' }) })
        .catch((e) => { res.status(400).json({ valid: false, message: e }) });
};