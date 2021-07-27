const { Schema } = require('mongoose')
const Joi = require('joi')
const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  },
  { versionKey: false, timestamps: true },
)

const validateContact = newContact => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string(),
    phone: Joi.string(),
    favorite: Joi.boolean(),
  })
  const { error } = schema.validate(newContact)
  return error
}

const validateContactByFavorite = contactForUpdate => {
  const schema = Joi.object({
    favorite: Joi.boolean().required(),
  })
  const { error } = schema.validate(contactForUpdate)
  return error
}

module.exports = { contactSchema, validateContact, validateContactByFavorite }
