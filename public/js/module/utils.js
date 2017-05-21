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
  
  var formatDate = function formatDate(date) {
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
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
  
  exports.isDescendant = isDescendant;
  exports.formatDate = formatDate;
  exports.colorGenerator = colorGenerator;
  exports.default = {
    isDescendant: isDescendant,
    formatDate: formatDate,
    colorGenerator: colorGenerator
  };

});
