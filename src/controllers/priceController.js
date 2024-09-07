const Price = require('../models/Price');

exports.getSuggestions = async (req, res) => {
  try {
    const { field, query } = req.query;
    const suggestions = await Price.getSuggestions(field, query);
    res.json(suggestions);
  } catch (error) {
    res.status(500).json({ error: '서버 오류가 발생했습니다.' });
  }
};

exports.getPriceCheck = async (req, res) => {
  try {
    const { pol, pod, type } = req.query;
    const priceInfo = await Price.getPriceInfo(pol, pod, type);
    if (priceInfo) {
      res.json(priceInfo);
    } else {
      res.status(404).json({ error: '해당 조건의 운송 정보를 찾을 수 없습니다.' });
    }
  } catch (error) {
    res.status(500).json({ error: '서버 오류가 발생했습니다.' });
  }
};
