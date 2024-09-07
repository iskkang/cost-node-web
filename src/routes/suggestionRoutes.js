const express = require('express');
const router = express.Router();
const suggestionController = require('./controllers/suggestionController');

// 추천 관련 엔드포인트
router.get('/suggestions', suggestionController.getSuggestions);

module.exports = router;
