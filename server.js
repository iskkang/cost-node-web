const express = require('express');
const Airtable = require('airtable');
const dotenv = require('dotenv');
const path = require('path');
const helmet = require('helmet');

// 환경 변수 설정
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Airtable 설정
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID);
const TABLE_NAME = 'tcr'; // Table Name: tcr

// Content Security Policy(CSP) 설정 (Helmet 사용)
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'"],  // 인라인 스크립트 허용(보안 위험성 있음)
            styleSrc: ["'self'", "'unsafe-inline'"],
        },
    },
}));

// 정적 파일 제공 (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// API 엔드포인트: Airtable에서 데이터를 가져오기
app.get('/api/tickets', (req, res) => {
    const pol = req.query.pol;  // 사용자가 입력한 출발지
    const pod = req.query.pod;  // 사용자가 입력한 도착지
    const type = req.query.type; // 사용자가 입력한 유형

    base(TABLE_NAME).select({
        filterByFormula: `AND({POL} = '${pol}', {POD} = '${pod}', {Type} = '${type}')`,
        view: "Grid view"
    }).firstPage((err, records) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Airtable API error' });
        }

        // 검색된 레코드들을 배열로 전송
        const results = records.map(record => ({
            pol: record.get('POL'),
            pod: record.get('POD'),
            type: record.get('Type'),
            cost: record.get('Cost'),
            t_time: record.get('t/Time'),
            route: record.get('Route')
        }));

        res.json(results);
    });
});

// 서버 시작
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
