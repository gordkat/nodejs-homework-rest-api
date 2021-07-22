const express = require('express')
const router = express.Router()
const { contacts: controllers } = require('../../controllers')
const validateMiddleware = require('../../middleware/validateMiddleware.js')
const {
  contact: { validateContact, validateContactByFavorite },
} = require('../../model/schemas')

router.get('/', controllers.listContacts)

router.get('/:id', controllers.getById)

router.post('/', validateMiddleware(validateContact), controllers.addContact)

router.put('/:id', controllers.updateContact)

router.delete('/:id', controllers.removeContact)

router.patch(
  '/:id/favorite',
  validateMiddleware(validateContactByFavorite),
  controllers.updateStatusContact,
)

module.exports = router
