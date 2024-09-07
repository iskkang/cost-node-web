const express = require('express');
const cors = require('cors');
const airtableRoutes = require('./routes/airtableRoutes');

const app = express();

// CORS 설정
app.use(cors());

// JSON 파싱
app.use(express.json());

// Airtable 데이터 라우트 연결
app.use('/api/airtable', airtableRoutes);

// 서버 시작
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
