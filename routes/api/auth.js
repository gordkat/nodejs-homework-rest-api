const express = require('express')
const multer = require('multer')
const path = require('path')

const { auth: ctrl } = require('../../controllers')
const { validateMiddleware, authtenticate } = require('../../middleware')
const {
  user: { validateUser, validateUserByEmail },
} = require('../../model/schemas')
const authRouter = express.Router()
const tempDir = path.join(process.cwd(), 'tmp')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir)
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
  limits: { fileSize: 1048576 },
})

const uploadMiddlewar = multer({ storage })

authRouter.post('/signup', validateMiddleware(validateUser), ctrl.registerUser)
authRouter.post('/login', validateMiddleware(validateUser), ctrl.loginUser)
authRouter.get('/logout', authtenticate, ctrl.logoutUser)
authRouter.get('/current', authtenticate, ctrl.getProfile)
authRouter.get('/verify/:verifyToken', ctrl.verify)
authRouter.post(
  '/verify',
  validateMiddleware(validateUserByEmail),
  ctrl.resendVerify,
)
authRouter.patch(
  '/avatars',
  authtenticate,
  uploadMiddlewar.single('avatar'),
  ctrl.updateAvatar,
)
module.exports = authRouter
