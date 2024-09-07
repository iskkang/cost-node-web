const Airtable = require('airtable');
require('dotenv').config();  // 환경 변수를 로드합니다

Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: process.env.AIRTABLE_API_KEY
});

const base = Airtable.base(process.env.AIRTABLE_BASE_ID);
const table = base('cis_cost');  // 'tcr'은 당신의 테이블 이름입니다. 필요하다면 변경하세요.

module.exports = table;
