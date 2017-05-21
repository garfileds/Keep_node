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
  
  exports.isDescendant = isDescendant;
  exports.formatDate = formatDate;
  exports.colorGenerator = colorGenerator;
  exports.getParentEl = getParentEl;
  exports.default = {
    isDescendant: isDescendant,
    formatDate: formatDate,
    colorGenerator: colorGenerator,
    getParentEl: getParentEl
  };

});
