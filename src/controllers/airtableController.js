const fs = require('fs');
const path = require('path');
const airtableClient = require('../utils/airtableClient');

// Airtable 데이터를 가져와 data.json 파일에 저장하는 함수
exports.fetchAndSaveData = async (req, res) => {
  try {
    const records = [];
    await airtableClient.select().eachPage((pageRecords, fetchNextPage) => {
      pageRecords.forEach(record => {
        records.push(record.fields);
      });
      fetchNextPage();
    });

    // data.json 파일로 저장
    const dataPath = path.join(__dirname, '../../public/data.json');
    fs.writeFileSync(dataPath, JSON.stringify(records, null, 2));

    res.json({ message: 'Data successfully fetched and saved to data.json' });
  } catch (error) {
    console.error('Error fetching data from Airtable:', error);
    res.status(500).json({ error: 'Failed to fetch data from Airtable' });
  }
};
