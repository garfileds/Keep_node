/**
 * Created by adoug on 2017/7/18.
 */

const Pokeman = require('../../models/pokeman'),
  Plan = require('../../models/plan')

module.exports.getCollectedPokemen = function (req, res) {
  const user = req.user

  Plan
  .find({
    user_id: user._id,
    status: 'done'
  }, 'pokeman_id')
  .exec()
  .then(pokemanIds => {
    pokemanIds = pokemanIds.map(pokemanIdModel => pokemanIdModel.toObject().pokeman_id)

    Pokeman
    .find({
      _id: {
        $in: pokemanIds
      }
    }, '-__v')
    .exec()
    .then(pokemen => {
      return res.status(200).json(pokemen)
    })
  })
}

module.exports.getPokemen = function (req, res) {
  const user = req.user

  Plan
  .find({
    user_id: user._id
  }, 'pokeman_id')
  .exec()
  .then(pokemanIds => {
    pokemanIds = pokemanIds.map(pokemanIdModel => pokemanIdModel.toObject().pokeman_id)

    Pokeman
    .find({
      _id: {
        $in: pokemanIds
      }
    }, '-__v')
    .exec()
    .then(pokemen => {
      return res.status(200).json(pokemen)
    })
  })
}