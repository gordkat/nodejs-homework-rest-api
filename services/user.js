const { User } = require('../model')
const getOneUser = filter => {
  return User.findOne(filter)
}
const addUser = ({ email, password }) => {
  const newUser = new User({ email })
  newUser.setPassword(password)
  return newUser.save()
}
const updateById = (id, updateInfo) => {
  return User.findByIdAndUpdate(id, updateInfo, { new: true })
}
module.exports = { getOneUser, addUser, updateById }
