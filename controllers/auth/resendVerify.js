const { user: service } = require('../../services')
const { nanoid } = require('nanoid')
const { sendMail } = require('../../utils')
const resendVerify = async (req, res, next) => {
  const { email } = req.body
  try {
    const user = await service.getOneUser({ email })
    if (!user) {
      return res.status(404).json({
        status: 'error',
        code: 404,
        message: 'User not found',
      })
    }
    if (user.verify) {
      return res.status(400).json({
        status: 'error',
        code: 400,
        message: 'Verification has already been passed',
      })
    }
    let verifyToken = user.verifyToken
    if (!user.verifyToken) {
      verifyToken = nanoid()
      await service.updateById(user._id, { verifyToken })
    }
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
module.exports = resendVerify
