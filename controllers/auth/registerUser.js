const { user: service } = require('../../services')
const registerUser = async (req, res, next) => {
  const { email, password } = req.body
  try {
    const result = await service.getOneUser({ email })
    if (result) {
      res.status(409).json({
        status: 'error',
        code: 409,
        message: 'Email in use',
      })
      return
    }
    const user = await service.addUser({ email, password })
    const userInfo = {
      email: user.email,
      subscription: user.subscription,
      avatarUrl: user.avatarUrl,
    }
    res.status(201).json({
      status: 'success',
      code: 201,
      data: { user: userInfo },
    })
  } catch (error) {
    next(error)
  }
}
module.exports = registerUser
