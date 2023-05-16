// 本地缓存工具类，对window.localStorage的封装
class LocalCache {
  setCache(key, value) {
    window.localStorage.setItem(key, JSON.stringify(value));
    //设置缓存
  }
  getCache(key) {
    const value = window.localStorage.getItem(key);
    if (value) {
      return JSON.parse(value);
    }
    //获取缓存
  }
  deleteCache(key) {
    window.localStorage.removeItem(key);
    //移除缓存
  }
  clearCache() {
    window.localStorage.clear();
    //清空所有缓存
  }
}
export default new LocalCache();
