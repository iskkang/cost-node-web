const express = require('express');
const router = express.Router();
const priceController = require('../controllers/priceController');

// 가격 제안 및 가격 확인 엔드포인트

router.get('/price-check', priceController.getPriceCheck);

module.exports = router;
