const userServices = require('../../services/user-services')
const db = require('../../models')
const { User, Restaurant, Comment } = db
const { imgurFileHandler } = require('../../helpers/file-helper')

const userController = {
  signUpPage: (req, res) => {
    res.render('signup')
  },
  signUp: (req, res, next) => {
    userServices.signUp(req, (err, data) => {
      if (err) return next(err)
      req.flash('success_messages', 'User was successfully created')
      res.redirect('/signin')
    })
  },
  signInPage: (req, res) => {
    res.render('signin')
  },
  signIn: (req, res) => {
    req.flash('success_messages', '成功登入！')
    res.redirect('/restaurants')
  },
  logout: (req, res) => {
    req.flash('success_messages', '登出成功！')
    req.logout()
    res.redirect('/signin')
  },
  getUser: (req, res, next) => {
    return User.findByPk(req.params.id, {
      include: [
        {
          model: Comment,
          include: Restaurant
        }
      ]
    })
      .then(user => {
        if (!user) throw new Error("User didn't exist!")
        res.render('users/profile', { user: user.toJSON() })
      })
      .catch(err => next(err))
  },
  editUser: (req, res, next) => {
    return User.findByPk(req.params.id, {
      raw: true
    })
      .then(user => {
        if (!user) throw new Error("User didn't exist!")
        res.render('users/edit', { user })
      })
      .catch(err => next(err))
  },
  putUser: (req, res, next) => {
    const { name } = req.body
    if (!name) throw new Error('User name is required!')
    const { file } = req
    return Promise.all([
      User.findByPk(req.params.id),
      imgurFileHandler(file)
    ])
      .then(([user, filePath]) => {
        if (!user) throw new Error("User didn't exist!")
        return user.update({
          name,
          image: filePath || user.image
        })
      })
      .then(() => {
        req.flash('success_messages', '使用者資料編輯成功')
        res.redirect(`/users/${req.params.id}`)
      })
      .catch(err => next(err))
  },
  addFavorite: (req, res, next) => {
    userServices.addFavorite(req, err => err ? next(err) : res.redirect('back'))
  },
  removeFavorite: (req, res, next) => {
    userServices.removeFavorite(req, err => err ? next(err) : res.redirect('back'))
  },
  addLike: (req, res, next) => {
    userServices.addLike(req, err => err ? next(err) : res.redirect('back'))
  },
  removeLike: (req, res, next) => {
    userServices.removeLike(req, err => err ? next(err) : res.redirect('back'))
  },
  getTopUsers: (req, res, next) => {
    userServices.getTopUsers(req, (err, data) => err ? next(err) : res.render('top-users', data))
  },
  addFollowing: (req, res, next) => {
    userServices.addFollowing(req, err => err ? next(err) : res.redirect('back'))
  },
  removeFollowing: (req, res, next) => {
    userServices.removeFollowing(req, err => err ? next(err) : res.redirect('back'))
  }
}
module.exports = userController
