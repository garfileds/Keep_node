define('public/js/module/utils', function(require, exports, module) {

  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  /**
   * Created by adoug on 2017/5/15.
   */
  
  exports.isDescendant = isDescendant;
  
  
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
  
  exports.default = {
    isDescendant: isDescendant
  };

});
