import hyRequest from "../request";

export function getSearchConditions() {
  return hyRequest.get({
    url: "/search/top",
  });
}
export function getSearchHouse() {
  return hyRequest.get({
    url: "/search/result",
  });
}

// 测试用的配置，需要在vue.config.js中配置代理
const TSET_URL = "http://localhost:3000/api";
const _apitsp = "1657957399020";
const _fasTraceId = "1657957399023KiYJenCT_6Th0R8QmkS3QDMD3wNhFaJsfn97x";

// 发起网络请求
export function getGuessulike(cityId) {
  return hyRequest.post({
    url:
      TSET_URL +
      `/bnbapp-node-h5/h5/suggest/guessulike/bnb?_apitsp=${_apitsp}&_fasTraceId=${_fasTraceId}
    `,
    method: "post",
    data: { cityId: cityId, keywordTryRecommend: 2 },
  });
}

export function keywordSearchSuggest(keyword,cityId) {
  return hyRequest.post({
    url:
      TSET_URL +
      `/bnbapp-node-h5/h5/keyword/keywordsearchsuggest/bnb?_apitsp=${_apitsp}&_fasTraceId=${_fasTraceId}
    `,
    method: "post",
    data: {
      cityId: cityId, // 城市 id
      keyword:keyword, // 搜索的关键字
      sourceCode: 702, // 源代码
    },
  });
}