/**
 * Created by adoug on 2017/5/18.
 */

var express = require('express')
var router = express.Router()

var mock_all = [
  {
    id: "p001",
    name: "背单词：A-Z",
    bg_image: "",
    color: "#A7ED84",
    progress_color: "#ffffff",
    progress: {
      start_day: "05/17/2017",
      days: 14,
      marked: [1, 3, 5, 7, 9, 14],
      done: [1]
    },
    statu: "ing"
  }, {
    id: "p002",
    name: "线性代数第一章",
    bg_image: "",
    color: "#9EEFC5",
    progress_color: "#ffffff",
    progress: {
      start_day: "05/17/2017",
      days: 14,
      marked: [1, 2, 5, 7, 10, 14],
      done: [1, 2]
    },
    statu: "ing"
  }, {
    id: "p003",
    name: "概率论第一章",
    bg_image: "",
    color: "#66CDAA",
    progress_color: "#ffffff",
    progress: {
      start_day: "05/17/2017",
      days: 7,
      marked: [1, 2, 5, 7],
      done: [1, 2, 5, 7]
    },
    statu: "done"
  }
]

var mock_ing = [
  {
    id: "p001",
    name: "背单词：A-Z",
    bg_image: "",
    detail: {
      start_day: "05/17/2017",
      days: 14,
      marked: [1, 3, 5, 7, 9, 14],
      done: [1]
    },
    statu: "ing"
  }, {
    id: "p002",
    name: "线性代数第一章",
    bg_image: "",
    detail: {
      start_day: "05/17/2017",
      days: 14,
      marked: [1, 2, 5, 7, 10, 14],
      done: [1, 2]
    },
    statu: "ing"
  }
]

var mock_done = [{
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
  }]

/* GET plans. */
router.get('/', function(req, res) {
  var planStatu = req.query.statu || 'all';

  if (planStatu === 'all') {
    res.json(mock_all)
  } else if (planStatu === 'ing') {
    res.json(mock_ing)
  } else if (planStatu === 'done') {
    res.json(mock_done)
  }
})

module.exports = router

