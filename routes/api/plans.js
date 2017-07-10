/**
 * Created by adoug on 2017/5/18.
 */

const express = require('express')
const router = express.Router()

const planHandler = require('../../app/plan')

/* GET plans */
router.get('/', planHandler.getPlans)

/* POST plans */
router.post('/', planHandler.updatePlans)

module.exports = router

