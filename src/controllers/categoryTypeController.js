const CategoryType = require('../models/categoryTypeModel');

module.exports.getCategoriesType = (req, res, next) => {
    CategoryType.fetchAll()
        .then(({ rows }) => { res.status(200).json({ valid: true, data: rows }) })
        .catch((e) => { res.status(400).json({ valid: false, message: e }) });
};