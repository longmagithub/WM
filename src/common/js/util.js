/**
 * 解析url参数
 * @example ?id=12345&a=b
 * @return Object {id: 12345, a: b}
 */
export function urlParse() {
  let url = window.location.search
  let obj = {}
  // 正则：开始是?或&,第二个 非?或&的字符一个或多个 = 后面非?或&的字符一个或多个
  let reg = /[?&][^?&]+=[^?&]+/g
  let arr = url.match(reg)
  // ['?id=123456','&a=b']
  if (arr) {
    arr.forEach((item) => {
      let tempArr = item.substring(1).split('=') // ['id','123456']
      let key = decodeURIComponent(tempArr[0])
      let val = decodeURIComponent(tempArr[1])
      obj[key] = val
    })
  }
  return obj
};
