const adminServices = require('../../services/admin-services')

const categoryController = {
  getCategories: (req, res, next) => {
    adminServices.getCategories(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
  },
  postCategory: (req, res, next) => {
    adminServices.postCategory(req, err => err ? next(err) : res.json({ status: 'success' }))
  },
  putCategory: (req, res, next) => {
    adminServices.putCategory(req, err => err ? next(err) : res.json({ status: 'success' }))
  },
  deleteCategory: (req, res, next) => {
    adminServices.deleteCategory(req, err => err ? next(err) : res.json({ status: 'success 刪除成功' }))
  }
}
module.exports = categoryController
