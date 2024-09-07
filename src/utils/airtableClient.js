const Airtable = require('airtable');

Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: process.env.AIRTABLE_API_KEY
});

const base = Airtable.base(process.env.AIRTABLE_BASE_ID);
const table = base('tcr');  // 'tcr'은 실제 테이블 이름으로 변경해야 합니다.

module.exports = table;
