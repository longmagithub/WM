/**
 * change Title
 */
export const changeTitleInWx = function (title) {
  document.title = title
  const i = document.createElement('iframe')
  i.src = '/favicon.ico'
  i.style.display = 'none'
  i.onload = function () {
    setTimeout(function () {
      i.remove()
    }, 9)
  }
  document.body.appendChild(i)
  // document.title = title
  // const iframe = document.createElement('iframe')
  // iframe.src = 'img/logo.png'
  // const listener = () => {
  //   setTimeout(() => {
  //     iframe.removeEventListener('load', listener)
  //     setTimeout(() => {
  //       document.body.removeChild(iframe)
  //     }, 0)
  //   }, 0)
  // }
  // iframe.addEventListener('load', listener)
  // document.body.appendChild(iframe)
}

/*
 * 判断是否在微信浏览器
 */
export const isWechat = function () {
  const ua = window.navigator.userAgent.toLowerCase()
  const wechatInfo = ua.match(/MicroMessenger\/([\d.]+)/i)
  if (!wechatInfo) {
    // 仅支持微信
    return 0
  } else if (wechatInfo[1] < '5.0') {
    // 仅支持微信5.0以上版本
    return 1
  } else {
    return 2
  }
}

/*
 * 拼接对象为 get 方式的结构
 */
export const createParams = function (data) {
  let params = []
  for (let key in data) {
    params.push((key + '=' + data[key]).toString())
  }
  return '?' + params.join('&')
}

export const formatTime = function (date, mode) {
  if (!date) {
    return '-'
  }
  let d0 = new Date(0)
  let d1 = new Date('1970/01/01 08:00:00')
  date = parseInt(date) + ((d1.getTime() - d0.getTime()) / 1000)
  let d = new Date(parseInt(date) * 1000)
  let format = mode
  let o = {
    'M+': d.getMonth() + 1, // month
    'd+': d.getDate(), // day
    'h+': d.getHours(), // hour
    's+': d.getSeconds(), // second
    'm+': d.getMinutes(), // minute
    'q+': Math.floor((d.getMonth() + 3) / 3), // quarter
    'S': d.getMilliseconds() // millisecond
  }
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (d.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
    }
  }
  return format
}

/*
 * 拨打电话
 */
export const callPhone = function (phone) {
  window.location.href = `tel:${phone}`
}

/**
 * 冒泡排序
 */
export const bubbleSort = function (arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i; j < arr.length; j++) {
      if (arr[i].price < arr[j].price) {
        let temp = arr[i]
        arr[i] = arr[j]
        arr[j] = temp
      }
    }
  }
  return arr
}
