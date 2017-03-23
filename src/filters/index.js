export function test() {
  console.log(1)
  return 1
}
/**
 * 冒泡排序
 */
export function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i; j < arr.length; j++) {
      if (arr[i].price > arr[j].price) {
        let temp = arr[i]
        arr[i] = arr[j]
        arr[j] = temp
      }
    }
  }
  return arr
}
export function fees(fee) {
  if (fee === 0) {
    return '免配送费'
  } else {
    return `配送费${fee}元`
  }
}
