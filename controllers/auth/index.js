const registerUser = require('./registerUser')
const loginUser = require('./loginUser')
const getProfile = require('./getProfile')
const logoutUser = require('./logoutUser')
const updateAvatar = require('./updateAvatar')
const verify = require('./verify')
const resendVerify = require('./resendVerify')
module.exports = {
  registerUser,
  loginUser,
  getProfile,
  logoutUser,
  updateAvatar,
  verify,
  resendVerify,
}
