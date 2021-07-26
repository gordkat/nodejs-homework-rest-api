const express = require('express')
const contactsRouter = express.Router()
const { contacts: controllers } = require('../../controllers')
const validateMiddleware = require('../../middleware/validateMiddleware.js')
const {
  contact: { validateContact, validateContactByFavorite },
} = require('../../model/schemas')

contactsRouter.get('/', controllers.listContacts)

contactsRouter.get('/:id', controllers.getById)

contactsRouter.post(
  '/',
  validateMiddleware(validateContact),
  controllers.addContact,
)

contactsRouter.put('/:id', controllers.updateContact)

contactsRouter.delete('/:id', controllers.removeContact)

contactsRouter.patch(
  '/:id/favorite',
  validateMiddleware(validateContactByFavorite),
  controllers.updateStatusContact,
)

module.exports = contactsRouter
