const adminServices = require('../../services/admin-services')

const categoryController = {
  getCategories: (req, res, next) => {
    adminServices.getCategories(req, (err, data) => err ? next(err) : res.render('admin/categories', data))
  },
  postCategory: (req, res, next) => {
    adminServices.postCategory(req, (err, data) => err ? next(err) : res.redirect('/admin/categories'))
  },
  putCategory: (req, res, next) => {
    adminServices.putCategory(req, err => err ? next(err) : res.redirect('/admin/categories'))
  },
  deleteCategory: (req, res, next) => {
    adminServices.deleteCategory(req, err => err ? next(err) : res.redirect('/admin/categories'))
  }
}
module.exports = categoryController
