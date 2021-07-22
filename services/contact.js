const { Contact } = require('../model')

const listContacts = () => {
  return Contact.find({})
}
const getById = async id => {
  try {
    return await Contact.findById(id)
  } catch (error) {
    if (error.message.includes('Cast to ObjectId failed for value')) {
      return null
    }
    throw error
  }
}
const addContact = newContact => {
  return Contact.create(newContact)
}

const updateContact = async (id, body) => {
  try {
    return await Contact.findByIdAndUpdate(id, body, { new: true })
  } catch (error) {
    if (error.message.includes('Cast to ObjectId failed for value')) {
      return null
    }
    throw error
  }
}

const removeContact = async id => {
  try {
    return await Contact.findByIdAndDelete(id)
  } catch (error) {
    if (error.message.includes('Cast to ObjectId failed for value')) {
      return null
    }
    throw error
  }
}

// const updateFavorite = (id, body) => {
//   return Contact.findByIdAndUpdate(id, body, { new: true })
// }

module.exports = {
  addContact,
  listContacts,
  getById,
  updateContact,
  removeContact,
  // updateFavorite,
}
