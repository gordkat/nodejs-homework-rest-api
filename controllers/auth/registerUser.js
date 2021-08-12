const { nanoid } = require('nanoid')
const { sendMail } = require('../../utils')
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
    const verifyToken = nanoid()

    await service.addUser({ email, password, verifyToken })
    const mail = {
      to: email,
      subject: 'Confirm your email',
      text: `Confirm your email http://localhost:3000/api/users/verify/${verifyToken}`,
    }
    await sendMail(mail)

    res.json({
      status: 'success',
      code: 200,
      message: 'Verification email sent. Please, confirm your email',
    })
  } catch (error) {
    next(error)
  }
}
module.exports = registerUser
