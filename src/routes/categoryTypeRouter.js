const express = require('express');
const router = express.Router();
const { getCategoriesType } = require('../controllers/categoryTypeController');

router.get('/categories-type', getCategoriesType);

module.exports = router;