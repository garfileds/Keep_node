/**
 * Created by adoug on 2017/5/18.
 */

const express = require('express')
const router = express.Router()

const mock_new_plan = {
  code: 'ok',
  message: {
    planId: 'p004'
  }
}
const mock_plan = {
  id: "p003",
  name: "概率论第一章",
  bg_image: "",
  detail: {
    start_day: "05/17/2017",
    days: 7,
    marked: [1, 2, 5, 7],
    done: [1, 2, 5, 7]
  },
  statu: "done"
}
const mock_update = {
  code: 'ok'
}

/* Plan collection. */
router.post('/', function(req, res) {
  res.status(201)
      .json(mock_new_plan)
})

router.route('/:pid')
.get(function(req, res) {
  res.json(mock_plan)
})
.post(function(req, res) {
  res.json(mock_update)
})

router.route('/:pid/done')
.post(function (req, res) {
  res.json(mock_update)
})

module.exports = router
