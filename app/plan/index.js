/**
 * Created by adoug on 2017/7/3.
 */

const debug = require('debug')('app:app:plans' + process.pid),
  path = require('path'),
  md5 = require('blueimp-md5'),

  NotFoundError = require(path.join(__dirname, '../..', 'errors', 'NotFoundError.js')),
  Plan = require(path.join(__dirname, '../..', 'models', 'plan.js'))

module.exports.getPlans = function getPlans(req, res, next) {
  let planStatus = req.query.statu || 'all'
  let queryCondition = { user_id: req.user._id }

  planStatus !== 'all' && (queryCondition.status = planStatus)

  Plan.
    find(queryCondition, '-__v -user_id').
    exec((error, plans) => {
      if (error) {
        return next(error)
      }
      return res.status(200).json(plans)
    })
}

module.exports.updatePlans = function updatePlans(req, res, next) {
  let type = req.body.type,
    clientCommitId = req.body.commit_id,
    updateInfo = req.body.update_info

  let user = req.user

  if (type === 'global') {
    Plan.
      remove({user_id: user._id}).
      exec().
      then(() => {
        return Plan.insertMany(updateInfo)
      }, error => next(error)).
      then(plans => {
        let commitId
        commitId = md5(JSON.stringify(plans))

        return res.status(200).json({
          'code': 'ok',
          'commit_id': commitId
        })
      }, error => next(error))
  }

  if (type === 'local') {
    let update, remove
    update = updateInfo.update
    remove = updateInfo.remove

    Plan.
      find({}, '-__v -user_id').
      exec((error, plans) => {
        if (error) return next(error)

        let commitId
        commitId = backupPlans(plans)[1]

        if (commitId === clientCommitId) {
          //如果客户端与服务端一致
          let sequence
          sequence = Promise.resolve()

          /*sequence = Object.keys(update).reduce((sequence, planId) => {
            let plan = update[planId]
            plan.user_id = user._id

            return sequence.then(() => {
              return Plan.update({ user_id: user._id }, plan).exec()
            }, Promise.resolve())
          })*/

          Object.keys(update).forEach(planId => {
            let plan = update[planId]
            plan.user_id = user._id

            sequence = sequence.then(() => {
              return Plan.update({user_id: user._id}, plan).exec()
            })
          })

          sequence.
            then(() => {
              return Plan.
                remove({
                  '_id': {
                    $in: remove
                  }
                }).
                exec()
            }).
            then(() => Plan.find({}, '-__v -user_id').exec()).
            then(plans => {
              let commitId
              commitId = backupPlans(plans)[1]

              return res.status(200).json({
                code: 'ok',
                commit_id: commitId
              })
            }, error => next(error))
        } else {
          return res.status(200).json({
            code: 'not synchronized',
            commit_id: commitId,
            plans: plans
          })
        }
      })
  }
}

module.exports.createPlan = function createPlan(req, res, next) {
  let plan = req.body

  formatRequestPlan(plan, req.user._id)

  Plan.
    create(plan).
    then(plan => {
      return res.status(201).json({ plan_id: plan._id })
    }, error => next(error))
}

function formatRequestPlan(plan, userId) {
  plan.user_id = userId
  plan.progress = {}
  plan.progress = {
    marked: plan.marked,
    days: plan.days,
    start_day: plan.start_day
  }
}

function backupPlans(plans) {
  const planTemplate = {
    _id: '',
    id: '',
    title: '',
    bg_image: '',
    color: 'rgb(255, 204, 51)',
    progress_color: "#fff",
    progress: {
      days:21,
      start_day: '',
      done: [],
      marked: []
    },
    status: ''
  }

  let plansObject = plans.map(planModel => planModel.toObject())

  let plansStr = ''
  plansObject.forEach(plan => {
    let planTemp = Object.assign({}, planTemplate, plan)
    plansStr += JSON.stringify(planTemp)
  })

  let commitId = md5(plansStr)

  return [plansStr, commitId]
}