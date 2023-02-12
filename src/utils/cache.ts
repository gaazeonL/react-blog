export const getCache = function (key: string) {
  let value = localStorage.getItem(key);
  return {
    //本地没有获取到数据就返回null，用于后续处理
    value: value ? JSON.parse(value) : null,
  };
};
export const setCache = function (key: string, value: any) {
  localStorage.setItem(key, JSON.stringify(value));
};

export const deleteCache = function (key: string) {
  localStorage.removeItem(key);
};
