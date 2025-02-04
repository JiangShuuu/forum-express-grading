const express = require('express')
const router = express.Router()
const adminController = require('../../../controllers/pages/admin-controller')
const categoryController = require('../../../controllers/pages/category-controller')

const upload = require('../../../middleware/multer')

// 已完成
router.get('/restaurants/create', adminController.createRestaurants) // 新增餐廳的類別
router.get('/restaurants/:id/edit', adminController.editRestaurant)
router.get('/restaurants/:id', adminController.getRestaurant)
router.put('/restaurants/:id', upload.single('image'), adminController.putRestaurant)
router.delete('/restaurants/:id', adminController.deleteRestaurant)
router.get('/restaurants', adminController.getRestaurants)
router.post('/restaurants', upload.single('image'), adminController.postRestaurants)

router.get('/categories/:id', categoryController.getCategories)
router.put('/categories/:id', categoryController.putCategory)
router.delete('/categories/:id', categoryController.deleteCategory)
router.get('/categories', categoryController.getCategories)
router.post('/categories', categoryController.postCategory)

// router.put('/users/:id', adminController.putUsers)
// router.get('/users', adminController.getUsers)

router.get('/', (req, res) => res.redirect('/admin/restaurants'))

module.exports = router
