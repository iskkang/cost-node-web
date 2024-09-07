const express = require('express');
const router = express.Router();
const priceController = require('../controllers/priceController');

router.get('/suggestions', priceController.getSuggestions);
router.get('/price-check', priceController.getPriceCheck);

module.exports = router;
