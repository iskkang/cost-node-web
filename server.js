require('dotenv').config();  // 환경 변수 로드
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const airtableRoutes = require('./routes/airtableRoutes');  // Airtable 라우트 연결

const app = express();

// CORS 설정
app.use(cors());

// JSON 파싱
app.use(express.json());

// 정적 파일 제공 (public 폴더 내 파일 제공)
app.use(express.static('public'));  // 'public' 폴더에 data.json 파일 저장

// 기본 API 루트 경로 핸들러
app.get('/api', (req, res) => {
  res.json({ message: "Welcome to the API. Please use specific endpoints for data." });
});

// Airtable 데이터 라우트 연결
app.use('/api/airtable', airtableRoutes);

// 정적 파일 제공 예시: /data.json으로 접근 가능
app.get('/data.json', (req, res) => {
  const dataFilePath = path.join(__dirname, 'public', 'data.json');
  if (fs.existsSync(dataFilePath)) {
    res.sendFile(dataFilePath);
  } else {
    res.status(404).json({ error: 'data.json file not found' });
  }
});

// 404 처리 (없는 라우트 요청 시)
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
