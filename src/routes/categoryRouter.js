const express = require('express');
const router = express.Router();

const { getCategories, createCategory, updateCategory, getTransferCategories } = require('../controllers/categoryController');

router.get('/categories', getCategories);

router.post('/categories', createCategory);

router.put('/categories', updateCategory);

router.get('/transfercategories', getTransferCategories);

module.exports = router;