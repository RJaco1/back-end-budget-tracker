const Category = require('../models/categoryModel');

module.exports.getCategories = (req, res, next) => {
    const args = [req.user.uid];
    Category.fetchAll(args)
        .then(({ rows }) => { res.status(200).json({ valid: true, data: rows }) })
        .catch((e) => { res.status(400).json({ valid: false, message: e }) });
}

module.exports.createCategory = (req, res, next) => {
    const args = [req.body.category, req.body.category_type_id, req.user.uid]
    Category.create(args)
        .then(() => { res.status(201).json({ valid: true, message: 'new category created' }) })
        .catch((e) => { res.status(400).json({ valid: false, message: e }) });
};

module.exports.updateCategory = (req, res, next) => {
    const args = [req.body.category, req.body.category_type_id, req.body.category_id, req.user.uid]
    Category.update(args)
        .then(() => { res.status(200).json({ valid: true, message: 'category updated' }) })
        .catch((e) => { res.status(400).json({ valid: false, message: e }) });
};