const express = require('express')
const { auth: ctrl } = require('../../controllers')
const { validateMiddleware, authtenticate } = require('../../middleware')
const {
  user: { validateUser },
} = require('../../model/schemas')
const authRouter = express.Router()
authRouter.post('/signup', validateMiddleware(validateUser), ctrl.registerUser)
authRouter.post('/login', validateMiddleware(validateUser), ctrl.loginUser)
authRouter.get('/logout', authtenticate, ctrl.logoutUser)
authRouter.get('/current', authtenticate, ctrl.getProfile)
module.exports = authRouter
