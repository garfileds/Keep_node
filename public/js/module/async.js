define('public/js/module/async', function(require, exports, module) {

  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.runQueue = runQueue;
  /**
   * Created by adoug on 2017/6/23.
   */
  
  function runQueue(queue, fn, cb) {
    var step = function step(index) {
      if (index >= queue.length) {
        cb();
      } else {
        if (queue[index]) {
          fn(queue[index], function (error) {
            if (error) {
              return cb(error);
            } else {
              step(index + 1);
            }
          });
        } else {
          step(index + 1);
        }
      }
    };
  
    step(0);
  }

});
