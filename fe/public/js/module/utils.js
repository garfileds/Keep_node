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

/**
 * @fn 格式化日期
 * @param date|Date
 * @param format|String eg: yy-mm-dd mm月dd日
 * @returns {string}
 */
let formatDate = function (date, format) {
  format = format || 'yy-mm-dd'

  return format.replace(/(yy)|(mm)|(dd)/g, function (match, yy, mm, dd) {
    if (yy) return date.getFullYear()
    if (mm) return date.getMonth() + 1
    if (dd) return date.getDate()
  })
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

/**
 * 查找child的最近的指定的parent，如有则返回，否则返回false
 * @param parentSelector|String eg: '.header' 'p'
 * @param child|Node
 * @returns {boolean}
 */
let getParentEl = function (parentSelector, child) {
  let node = child.parentNode,
      parents = document.querySelectorAll(parentSelector)

  parents = Array.prototype.slice.call(parents, 0)

  while (node !== null) {
    if (parents.indexOf(node) > -1) {
      return node
    } else {
      node = node.parentNode
    }
  }

  return false
}

/**
 * @fn 依format返回表单数据
 * @param form|String|El
 * @param format|[String] eg: 'formData'/'object'
 * @returns {string}
 */
function form2(form, format) {
  if (typeof form === 'string') {
    form = document.querySelector(form);
  }

  format = format || 'formData'

  let len = form.elements.length; //表单字段长度;表单字段包括<input><select><button>等
  let field = null; //用来存储每一条表单字段
  let resultFormData = []; //保存字符串将要创建的各个部分
  let resultObject = {}
  let opLen, //select中option的个数
    opValue; //select中option的值
  //遍历每一个表单字段
  let i, j;
  let option
  for (i = 0; i < len; i++) {
    field = form.elements[i]
    switch (field.type) {
      case "select-one":
      case "select-multiple":
        if (field.name.length) {
          for (j = 0, opLen = filed.options.length; j < opLen; j++) {
            option = field.options[j]
            if (option.selected) {
              opValue = ''
              if (option.hasAttribute) {
                opValue = (option.hasAttribute('value') ? option.value : option.text)
              } else {
                opValue = (option.hasAttribute['value'].specified ? option.value : option.text) //IE下
              }
              resultObject[field.name] = opValue.trim()
              resultFormData.push(encodeURIComponent(field.name) + '=' + encodeURIComponent(opValue))
            }

          }
        }
        break
      case undefined:
      case "file":
      case "submit":
      case "reset":
      case "button":
        break
      case "radio":
      case "checkbox":
      default:
        if (field.name.length) {
          opValue = field.value
          resultObject[field.name] = opValue.trim()
          resultFormData.push(encodeURIComponent(field.name) + '=' + encodeURIComponent(opValue.trim()))
        }
        break
    }
  }

  if (format === 'formData') {
    return resultFormData.join('&')
  }
  return resultObject
}

export { isDescendant, formatDate, colorGenerator, getParentEl, form2 }

export default {
  isDescendant,
  formatDate,
  colorGenerator,
  getParentEl,
  form2
}