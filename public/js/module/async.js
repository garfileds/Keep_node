define('public/js/module/async', function(require, exports, module) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.runQueue = runQueue;
  
  var _utils = require('public/js/module/utils');
  
  function runQueue(queue, fn, cb) {
    var step = function step(index) {
      if (index >= queue.length) {
        cb();
      } else {
        if (queue[index]) {
          fn(queue[index], function () {
            step(index + 1);
          });
        } else {
          step(index + 1);
        }
      }
    };
  
    step(0);
  } /**
     * Created by adoug on 2017/6/23.
     */

});
