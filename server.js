require('dotenv').config();  // 환경 변수 로드
const express = require('express');
const cors = require('cors');
const suggestionRoutes = require('./routes/suggestionRoutes');
const priceCheckRoutes = require('./routes/priceCheckRoutes');

const app = express();

// CORS 설정
app.use(cors());

// JSON 파싱
app.use(express.json());

// API 루트 경로 핸들러
app.get('/api', (req, res) => {
  res.json({ message: "Welcome to the API. Please use specific endpoints for data." });
});

// API 라우트
app.use('/api/suggestions', suggestionRoutes);
app.use('/api/price-check', priceCheckRoutes);

// 404 처리
app.use((req, res, next) => {
  res.status(404).send("Sorry, that route doesn't exist.");
});

// 에러 핸들링
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// 서버 시작
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
