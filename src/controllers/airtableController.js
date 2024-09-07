const fs = require('fs');
const table = require('../utils/airtableClient');

exports.fetchAndSaveData = async (req, res) => {
  try {
    const records = [];
    await table.select().eachPage((pageRecords, fetchNextPage) => {
      pageRecords.forEach(record => {
        records.push(record.fields);
      });
      fetchNextPage();
    });

    // JSON 파일로 저장
    fs.writeFileSync('data.json', JSON.stringify(records, null, 2));

    res.json({ message: 'Data successfully fetched and saved to data.json' });
  } catch (error) {
    console.error('Error fetching data from Airtable:', error);
    res.status(500).json({ error: 'Failed to fetch data from Airtable' });
  }
};
