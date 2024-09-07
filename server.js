require('dotenv').config();  // 환경 변수 로드
const express = require('express');
const cors = require('cors');
const priceCheckRoutes = require('./src/routes/priceRoutes');  // priceRoutes 경로 확인
const suggestionRoutes = require('./src/routes/suggestionRoutes');  // suggestionRoutes 추가

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
app.use('/api/price-check', priceCheckRoutes);  // price-check 경로에 priceRoutes 연결
app.use('/api/suggestions', suggestionRoutes);  // suggestions 경로에 suggestionRoutes 연결

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
