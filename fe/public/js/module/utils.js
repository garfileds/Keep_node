/**
 * Created by adoug on 2017/5/15.
 */

let isDescendant = function (parent, child) {
  let node = child.parentNode
  while (node !== null) {
    if (node === parent) {
      return true
    } else {
      node = node.parentNode
    }
  }

  return false
}

let formatDate = function (date) {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
}

/**
 * @fn 生成216种网络安全色，16进制
 */
let colorGenerator = function () {
  const basis = ['00', '33', '66', '99', 'CC', 'FF']
  let i, j, k,
      length = basis.length - 1
  let result = []

  for (i = length; i >= 0; i--) {
    for (j = length; j >= 0; j--) {
      for (k = length; k >= 0; k--) {
        result.push(`#${basis[i]}${basis[j]}${basis[k]}`)
      }
    }
  }

  result.shift()
  result.shift()
  result.unshift('#3366CC', '#33CC00', '#FFFF00', '#CC6600', '#CC0000')

  return result
}

export { isDescendant, formatDate, colorGenerator }

export default {
  isDescendant,
  formatDate,
  colorGenerator
}