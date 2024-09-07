require('dotenv').config();  // 환경 변수 로드
const express = require('express');
const cors = require('cors');
const priceRoutes = require('./src/routes/priceRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// 미들웨어 설정
app.use(cors());  // CORS 활성화
app.use(express.json());  // JSON 파싱

// 라우트 설정
app.use('/api', priceRoutes);

// 서버 시작
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// 에러 핸들링
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// 404 Not Found 핸들링
app.use((req, res, next) => {
  res.status(404).send("Sorry, that route doesn't exist.");
});
