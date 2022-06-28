const commentServices = require('../../services/comment-services')

const commentController = {
  postComment: (req, res, next) => {
    commentServices.postComment(req, (err, data) => err ? next(err) : res.json({ status: 'success' }))
  },
  deleteComment: (req, res, next) => {
    commentServices.deleteComment(req, (err, data) => err ? next(err) : res.json({ status: 'success' }))
  }
}
module.exports = commentController
