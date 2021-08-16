export const TOP_TEN_KEYWORDS = [
  { name: '미니가습기', rank: 1, id: 1 },
  { name: '수분크림', rank: 7, id: 2 },
  { name: '모니터받침대', rank: 5, id: 3 },
  { name: '블루투스이어폰', rank: 4, id: 4 },
  { name: '헤어마스크', rank: 6, id: 5 },
  { name: '연필꽂이', rank: 3, id: 6 },
  { name: '귀걸이', rank: 2, id: 7 },
  { name: '샤워타올', rank: 8, id: 8 },
  { name: '남성벨트', rank: 9, id: 9 },
  { name: '포스터액자', rank: 10, id: 10 },
].sort((a, b) => a.rank - b.rank);

export const getRelSearchAPI = (input) => {
  return `https://completion.amazon.com/api/2017/suggestions?session-id=135-3077052-6015425&customer-id=&request-id=DMRETXPQ3PZJQ5TKYSWX&page-type=Gateway&lop=en_US&site-variant=desktop&client-info=amazon-search-ui&mid=ATVPDKIKX0DER&alias=aps&b2b=0&fresh=0&ks=undefined&prefix=${input}&event=onFocusWithSearchTerm&limit=11&fb=1&suggestion-type=KEYWORD&suggestion-type=WIDGET&_=1615280967091`;
};
