/**
 * Created by adoug on 2017/7/18.
 */

const express = require('express'),
  router = express.Router()

const pokemenHandler = require('../../app/pokemen')

/* get current user's all pokemen */
router.get('/', pokemenHandler.getPokemen)

module.exports = router