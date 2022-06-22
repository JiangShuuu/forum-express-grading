const { Restaurant, Category } = require('../models')
// const { imgurFileHandler } = require('../../helpers/file-helper')

const adminController = {
  getRestaurants: (req, cb) => {
    Restaurant.findAll({
      // 若沒raw會拿到sequelize物件
      raw: true,
      nest: true,
      include: [Category]
    })
      .then(restaurants => cb(null, { restaurants }))
      .catch(err => cb(err))
  },
  deleteRestaurant: (req, cb) => {
    return Restaurant.findByPk(req.params.id)
      .then(restaurant => {
        if (!restaurant) throw new Error("Restaurant didn't exist!")
        return restaurant.destroy()
      })
      .then(() => cb(null))
      .catch(err => cb(err))
  }
}

module.exports = adminController
