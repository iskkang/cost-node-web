const Airtable = require('airtable');
require('dotenv').config();  // 환경 변수를 로드합니다

Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: process.env.AIRTABLE_API_KEY
});

const base = Airtable.base(process.env.AIRTABLE_BASE_ID);
const table = base('Table Name');  // 'Table Name'을 실제 Airtable 테이블 이름으로 변경

module.exports = table;
