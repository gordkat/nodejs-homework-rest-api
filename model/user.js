const { model } = require('mongoose')
const {
  user: { userSchema },
} = require('./schemas')
const User = model('user', userSchema)
module.exports = User
