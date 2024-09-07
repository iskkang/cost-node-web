const express = require('express');
const router = express.Router();
const airtableController = require('../controllers/airtableController');

// Airtable 데이터를 가져와 JSON 파일로 저장하는 엔드포인트
router.get('/fetch-data', airtableController.fetchAndSaveData);

module.exports = router;
