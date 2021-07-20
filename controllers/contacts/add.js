const { contact: service } = require('../../services/')

const add = async (req, res, next) => {
  try {
    const { body } = req
    const result = await service.add(body)
    res.status(201).json({
      status: 'success',
      code: 201,
      data: { result },
    })
  } catch (error) {
    next(error)
  }
}

module.exports = add
