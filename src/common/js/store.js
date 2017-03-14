/**
 * set localStore
 * @param id 用户id
 * @param key
 * @param value
 */
export function saveToLocal(id, key, value) {
  let uxwm = window.localStorage.__uxwm__
  if (!uxwm) {
    console.log(1)
    uxwm = {}
    uxwm[id] = {}
  } else {
    console.log(2)
    uxwm = JSON.parse(uxwm)
    if (!uxwm[id]) {
      uxwm[id] = {}
    }
  }
  uxwm[id][key] = value
  window.localStorage.__uxwm__ = JSON.stringify(uxwm)
}
/**
 * get localStorage
 * @param id 用户id
 * @param key
 * @param def 如果没有就传默认
 */
export function loadFromLocal(id, key, def) {
  let uxwm = window.localStorage.__uxwm__
  if (!uxwm) {
    return def
  }
  uxwm = JSON.parse(uxwm)[id]
  if (!uxwm) {
    return def
  }
  let ret = uxwm[key]
  return ret || def
}

