const airtableClient = require('../utils/airtableClient');

class Price {
  static async getSuggestions(field, query) {
    const records = await airtableClient.select({
      filterByFormula: `LOWER(FIND('${query.toLowerCase()}', LOWER({${field}}))) > 0`
    }).firstPage();

    return [...new Set(records.map(record => record.get(field)))];
  }

  static async getPriceInfo(pol, pod, type) {
    const records = await airtableClient.select({
      filterByFormula: `AND({pol} = '${pol}', {pod} = '${pod}', {Type} = '${type}')`
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
