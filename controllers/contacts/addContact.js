const { contact: service } = require('../../services')

const addContact = async (req, res, next) => {
  try {
    const { body } = req
    const result = await service.addContact(body)
    res.status(201).json({
      status: 'success',
      code: 201,
      data: { result },
    })
  } catch (error) {
    next(error)
  }
}

module.exports = addContact
