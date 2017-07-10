/**
 * Created by adoug on 2017/5/18.
 */

const express = require('express'),
  router = express.Router()

const planHandler = require('../../app/plan')

/* Create plan. */
router.post('/', planHandler.createPlan)

module.exports = router
