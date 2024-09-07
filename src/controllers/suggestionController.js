exports.getSuggestions = (req, res) => {
  const { query } = req.query;

  // 예시: 쿼리에 따른 기본 추천 데이터 반환
  if (query) {
    res.json({
      message: `Suggestions for query: ${query}`,
      suggestions: [
        "suggestion1",
        "suggestion2",
        "suggestion3"
      ]
    });
  } else {
    res.status(400).json({
      error: "No query parameter provided."
    });
  }
};
