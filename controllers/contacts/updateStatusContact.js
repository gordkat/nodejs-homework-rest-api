const { contact: service } = require('../../services')
const updateStatusContact = async (req, res, next) => {
  const { id } = req.params
  const { body } = req
  try {
    const result = await service.updateContact(id, body)
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
module.exports = updateStatusContact
