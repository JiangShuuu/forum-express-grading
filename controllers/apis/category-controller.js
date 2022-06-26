const adminServices = require('../../services/admin-services')

const categoryController = {
  getCategories: (req, res, next) => {
    adminServices.getCategories(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
  }
}
module.exports = categoryController
