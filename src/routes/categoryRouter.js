const express = require('express');
const router = express.Router();

const { getCategories, createCategory, updateCategory } = require('../controllers/categoryController');

router.get('/categories', getCategories);

router.post('/categories', createCategory);

router.put('/categories', updateCategory);

module.exports = router;