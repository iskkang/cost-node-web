const airtableClient = require('../utils/airtableClient');

class Price {
  static async getSuggestions(field, query) {
    const safefield = field.replace(/[^a-zA-Z0-9]/g, '');
    const safeQuery = query.replace(/'/g, "\\'").toLowerCase();

    return new Promise((resolve, reject) => {
      const suggestions = new Set();
      
      airtableClient.select({
        filterByFormula: `LOWER(FIND('${safeQuery}', LOWER({${safefield}}))) > 0`
      }).eachPage((records, fetchNextPage) => {
        records.forEach(record => {
          suggestions.add(record.get(safefield));
        });
        fetchNextPage();
      }, err => {
        if (err) {
          reject(err);
          return;
        }
        resolve(Array.from(suggestions));
      });
    });
  }

  static async getPriceInfo(pol, pod, type) {
    const safePol = pol.replace(/'/g, "\\'").toLowerCase();
    const safePod = pod.replace(/'/g, "\\'").toLowerCase();
    const safeType = type.replace(/'/g, "\\'").toLowerCase();

    return new Promise((resolve, reject) => {
      airtableClient.select({
        filterByFormula: `AND(
          LOWER({POL}) = '${safePol}',
          LOWER({POD}) = '${safePod}',
          LOWER({Type}) = '${safeType}'
        )`,
        maxRecords: 1
      }).firstPage((err, records) => {
        if (err) {
          reject(err);
          return;
        }
        if (records.length > 0) {
          const record = records[0];
          resolve({
            pol: record.get('POL'),
            pod: record.get('POD'),
            type: record.get('Type'),
            cost: record.get('cost'),
            time: record.get('t/Time'),
            route: record.get('route')
          });
        } else {
          resolve(null);
        }
      });
    });
  }
}

module.exports = Price;
