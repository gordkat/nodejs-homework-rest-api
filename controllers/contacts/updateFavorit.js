const { contact: service } = require('../../services/')
const updateFavorite = async (req, res, next) => {
  const { id } = req.params
  const { body } = req
  try {
    const result = await service.update(id, body)
    if (!result) {
      res.status(404).json({
        status: 'error',
        code: 404,
        message: 'Not found',
      })
      return
    }
    res.json({
      status: 'success',
      code: 200,
      data: { result },
    })
  } catch (error) {
    next(error)
  }
}
module.exports = updateFavorite
