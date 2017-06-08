define('public/js/module/esModule', function(require, exports, module) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  /**
   * @fileOverview: 将commonJs模块转为ESModule
   * Created by chenpeng on 2017/6/8.
   */
  
  var md5 = require('node_modules/blueimp-md5/js/md5');
  
  var Promise = require('node_modules/es6-promise/dist/es6-promise').Promise;
  
  exports.md5 = md5;
  exports.Promise = Promise;
  exports.default = {
    md5: md5,
    Promise: Promise
  };

});
