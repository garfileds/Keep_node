/**
 * @fileOverview: 将commonJs模块转为ESModule
 * Created by chenpeng on 2017/6/8.
 */

const md5 = require('blueimp-md5')

const Promise = require('es6-promise').Promise

const isEqual = require('lodash.isequal')

const cloneDeep = require('lodash.clonedeep')

export { md5, Promise, isEqual, cloneDeep }

export default {
  md5,
  Promise,
  isEqual,
  cloneDeep
}