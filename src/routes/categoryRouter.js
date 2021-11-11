const express = require('express');
const router = express.Router();

const { getCategories, createCategory, updateCategory, getTransferCategories, getAllCategories } = require('../controllers/categoryController');

router.get('/categories', getCategories);

router.get('/allcategories', getAllCategories);

router.post('/categories', createCategory);

router.put('/categories', updateCategory);

router.get('/transfercategories', getTransferCategories);

module.exports = router;