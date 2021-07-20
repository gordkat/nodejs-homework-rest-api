const express = require('express')
const router = express.Router()
const { contacts: controllers } = require('../../controllers')
const validateMiddleware = require('../../middleware/validateMiddleware.js')
const {
  contact: { validateContact, validateContactByFavorite },
} = require('../../model/schemas')

router.get('/', controllers.getAll)

router.get('/:id', controllers.getById)

router.post('/', validateMiddleware(validateContact), controllers.add)

router.put('/:id', controllers.update)

router.delete('/:id', controllers.del)

router.patch(
  '/:id/favorite',
  validateMiddleware(validateContactByFavorite),
  controllers.updateStatusContact,
)

module.exports = router
