const User = require('../models/userModel');

module.exports.createUser = (req, res, next) => {
    const args = [req.user.uid, req.user.email];
    User.create(args)
        .then(() => { res.status(201).json({ valid: true, message: 'user created' }) })
        .catch((e) => { res.status(400).json({ valid: false, message: e }) });
}