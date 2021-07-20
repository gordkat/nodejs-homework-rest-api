const { Contact } = require('../model')

const getAll = () => {
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
const add = newContact => {
  return Contact.create(newContact)
}

const update = async (id, body) => {
  try {
    return await Contact.findByIdAndUpdate(id, body, { new: true })
  } catch (error) {
    if (error.message.includes('Cast to ObjectId failed for value')) {
      return null
    }
    throw error
  }
}

const del = async id => {
  try {
    return await Contact.findByIdAndDelete(id)
  } catch (error) {
    if (error.message.includes('Cast to ObjectId failed for value')) {
      return null
    }
    throw error
  }
}

const updateFavorite = (id, body) => {
  return Contact.findByIdAndUpdate(id, body, { new: true })
}

module.exports = { add, getAll, getById, update, del, updateFavorite }
