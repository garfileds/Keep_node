define('public/js/module/a', function(require, exports, module) {

  'use strict';
  
  /**
   * Created by adoug on 2017/5/15.
   */
  
  var b = 'b';
  
  module.exports = {
    say: function say() {
      console.log('from module.');
    }
  };

});
