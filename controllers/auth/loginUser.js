const jwt = require('jsonwebtoken')
require('dotenv').config()
const { user: service } = require('../../services')

const loginUser = async (req, res, next) => {
  const { email, password } = req.body
  try {
    const user = await service.getOneUser({ email })
    if (!user || !user.comparePassword(password)) {
      return res.status(401).json({
        status: 'Unauthorized',
        code: 401,
        message: 'Email or password is wrong',
      })
    }
    const { SECRET_KEY } = process.env
    const payload = {
      id: user._id,
    }
    const token = jwt.sign(payload, SECRET_KEY)
    const updatedUser = await service.updateById(user._id, { token })

    res.json({
      status: 'success',
      code: 200,
      data: {
        token,
        user: {
          email: updatedUser.email,
          subscription: updatedUser.subscription,
        },
      },
    })
  } catch (error) {
    next(error)
  }
}
module.exports = loginUser
