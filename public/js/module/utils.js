define('public/js/module/utils', function(require, exports, module) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  /**
   * Created by adoug on 2017/5/15.
   */
  
  var isDescendant = function isDescendant(parent, child) {
    var node = child.parentNode;
    while (node !== null) {
      if (node === parent) {
        return true;
      } else {
        node = node.parentNode;
      }
    }
  
    return false;
  };
  
  /**
   * @fn 格式化日期
   * @param date|Date
   * @param format|String eg: yy-mm-dd mm月dd日
   * @returns {string}
   */
  var formatDate = function formatDate(date, format) {
    format = format || 'yy-mm-dd';
  
    return format.replace(/(yy)|(mm)|(dd)/g, function (match, yy, mm, dd) {
      if (yy) return date.getFullYear();
      if (mm) return date.getMonth() + 1;
      if (dd) return date.getDate();
    });
  };
  
  /**
   * @fn 生成216种网络安全色，16进制
   */
  var colorGenerator = function colorGenerator() {
    var basis = ['00', '33', '66', '99', 'CC', 'FF'];
    var i = void 0,
        j = void 0,
        k = void 0,
        length = basis.length - 1;
    var result = [];
  
    for (i = length; i >= 0; i--) {
      for (j = length; j >= 0; j--) {
        for (k = length; k >= 0; k--) {
          result.push('#' + basis[i] + basis[j] + basis[k]);
        }
      }
    }
  
    result.shift();
    result.shift();
    result.unshift('#3366CC', '#33CC00', '#FFFF00', '#CC6600', '#CC0000');
  
    return result;
  };
  
  /**
   * 查找child的最近的指定的parent，如有则返回，否则返回false
   * @param parentSelector|String eg: '.header' 'p'
   * @param child|Node
   * @returns {boolean}
   */
  var getParentEl = function getParentEl(parentSelector, child) {
    var node = child.parentNode,
        parents = document.querySelectorAll(parentSelector);
  
    parents = Array.prototype.slice.call(parents, 0);
  
    while (node !== null) {
      if (parents.indexOf(node) > -1) {
        return node;
      } else {
        node = node.parentNode;
      }
    }
  
    return false;
  };
  
  /**
   * @fn 依format返回表单数据
   * @param form|String|El
   * @param format|[String] eg: 'formData'/'object'
   * @returns {string}
   */
  var form2 = function form2(form, format) {
    if (typeof form === 'string') {
      form = document.querySelector(form);
    }
  
    format = format || 'formData';
  
    var len = form.elements.length; //表单字段长度;表单字段包括<input><select><button>等
    var field = null; //用来存储每一条表单字段
    var resultFormData = []; //保存字符串将要创建的各个部分
    var resultObject = {};
    var opLen = void 0,
        //select中option的个数
    opValue = void 0; //select中option的值
    //遍历每一个表单字段
    var i = void 0,
        j = void 0;
    var option = void 0;
    for (i = 0; i < len; i++) {
      field = form.elements[i];
      switch (field.type) {
        case "select-one":
        case "select-multiple":
          if (field.name.length) {
            for (j = 0, opLen = filed.options.length; j < opLen; j++) {
              option = field.options[j];
              if (option.selected) {
                opValue = '';
                if (option.hasAttribute) {
                  opValue = option.hasAttribute('value') ? option.value : option.text;
                } else {
                  opValue = option.hasAttribute['value'].specified ? option.value : option.text; //IE下
                }
                resultObject[field.name] = opValue.trim();
                resultFormData.push(encodeURIComponent(field.name) + '=' + encodeURIComponent(opValue));
              }
            }
          }
          break;
        case undefined:
        case "file":
        case "submit":
        case "reset":
        case "button":
          break;
        case "radio":
        case "checkbox":
        default:
          if (field.name.length) {
            opValue = field.value;
            resultObject[field.name] = opValue.trim();
            resultFormData.push(encodeURIComponent(field.name) + '=' + encodeURIComponent(opValue.trim()));
          }
          break;
      }
    }
  
    if (format === 'formData') {
      return resultFormData.join('&');
    }
    return resultObject;
  };
  
  exports.isDescendant = isDescendant;
  exports.formatDate = formatDate;
  exports.colorGenerator = colorGenerator;
  exports.getParentEl = getParentEl;
  exports.form2 = form2;
  exports.default = {
    isDescendant: isDescendant,
    formatDate: formatDate,
    colorGenerator: colorGenerator,
    getParentEl: getParentEl,
    form2: form2
  };

});
