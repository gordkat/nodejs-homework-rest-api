const { User } = require('../model')
const gravatar = require('gravatar')
const getOneUser = filter => {
  return User.findOne(filter)
}
const addUser = ({ email, password }) => {
  const avatarUrl = gravatar.url(email)
  console.log(avatarUrl)
  const newUser = new User({ email, avatarUrl })
  newUser.setPassword(password)
  return newUser.save()
}
const updateById = (id, updateInfo) => {
  return User.findByIdAndUpdate(id, updateInfo, { new: true })
}
module.exports = { getOneUser, addUser, updateById }
