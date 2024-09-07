const airtableClient = require('../utils/airtableClient');

class Price {
    static async getPriceInfo(pol, pod, type) {
    const safePol = pol.replace(/'/g, "\\'");
    const safePod = pod.replace(/'/g, "\\'");
    const safeType = type.replace(/'/g, "\\'");
  
    const records = await airtableClient.select({
      filterByFormula: `AND(
        LOWER({pol}) = LOWER('${safePol}'),
        LOWER({pod}) = LOWER('${safePod}'),
        LOWER({Type}) = LOWER('${safeType}')
      )`
    }).firstPage();
  
    if (records.length > 0) {
      const record = records[0];
      return {
        pol: record.get('pol'),
        pod: record.get('pod'),
        type: record.get('Type'),
        cost: record.get('cost'),
        time: record.get('t/Time'),
        route: record.get('route')
      };
    }
    return null;
  }
}

module.exports = Price;
