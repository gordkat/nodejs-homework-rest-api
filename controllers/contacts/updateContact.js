const { contact: service } = require('../../services')
const updateContact = async (req, res, next) => {
  const { body } = req
  const { id } = req.params
  const keysOfBody = Object.keys(body).length
  if (!keysOfBody) {
    res
      .status(400)
      .json({ status: 'error', code: 400, message: 'Missing fields' })
    return
  }
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
module.exports = updateContact
