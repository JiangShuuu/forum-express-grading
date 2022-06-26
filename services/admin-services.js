const { Restaurant, Category } = require('../models')
const { imgurFileHandler } = require('../helpers/file-helper')

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
  postRestaurants: (req, cb) => {
    const { name, tel, address, openingHours, description, categoryId } = req.body
    if (!name) throw new Error('Restaurant name is required!')

    const { file } = req

    imgurFileHandler(file)
      .then(filePath => Restaurant.create({
        name,
        tel,
        address,
        openingHours,
        description,
        image: filePath || null,
        categoryId
      }))
      .then(newRestaurant => cb(null, { restaurant: newRestaurant }))
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
  },
  putRestaurant: (req, cb) => {
    const { name, tel, address, openingHours, description, categoryId } = req.body
    if (!name) throw new Error('Restaurant name is required!')

    const { file } = req

    Promise.all([
      Restaurant.findByPk(req.params.id),
      imgurFileHandler(file)
    ]).then(([restaurant, filePath]) => {
      if (!restaurant) throw new Error("Restaurant didn't exist!")
      return restaurant.update({
        name,
        tel,
        address,
        openingHours,
        description,
        image: filePath || restaurant.image,
        categoryId
      })
    })
      .then(upRestaurant => cb(null, { restaurant: upRestaurant }))
      .catch(err => cb(err))
  },
  getRestaurant: (req, cb) => {
    Restaurant.findByPk(req.params.id, {
      raw: true,
      nest: true,
      include: [Category]
    })
      .then(restaurant => cb(null, { restaurant }))
      .catch(err => cb(err))
  },
  editRestaurant: (req, cb) => {
    Promise.all([
      Restaurant.findByPk(req.params.id, { raw: true }),
      Category.findAll({ raw: true })
    ])
      .then(([restaurant, categories]) => cb(null, { restaurant, categories }))
      .catch(err => cb(err))
  },
  createRestaurants: (req, cb) => {
    Category.findAll({
      raw: true
    })
      .then(categories => cb(null, { categories }))
      .catch(err => cb(err))
  },
  getCategories: (req, cb) => {
    return Promise.all([
      Category.findAll({ raw: true }),
      req.params.id ? Category.findByPk(req.params.id, { raw: true }) : null
    ])
      .then(([categories, category]) => cb(null, { categories, category }))
      .catch(err => cb(err))
  },
  postCategory: (req, cb) => {
    const { name } = req.body
    if (!name) throw new Error('Category name is required!')
    return Category.create({ name })
      .then(() => cb(null))
      .catch(err => cb(err))
  },
  putCategory: (req, cb) => {
    const { name } = req.body
    if (!name) throw new Error('Category name is required!')
    return Category.findByPk(req.params.id)
      .then(category => {
        if (!category) throw new Error("Category doesn't exist!")
        return category.update({ name })
      })
      .then(() => cb(null))
      .catch(err => cb(err))
  },
  deleteCategory: (req, cd) => {
    return Category.findByPk(req.params.id)
      .then(category => {
        if (!category) throw new Error("Category didn't exist!") // 反查，確認要刪除的類別存在，再進行下面刪除動作
        return category.destroy()
      })
      .then(() => cd(null))
      .catch(err => cd(err))
  }
}

module.exports = adminController
