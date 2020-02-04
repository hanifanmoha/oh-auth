const gsend = require('gmail-send')
const stringUtils = require('./string')

const registration = async (user, password) => {
  const web_url = 'https://elated-engelbart-93990b.netlify.com/login'
  const html = `
  <div>
    <h3>Please login to ${web_url} using the following account,</h3>
    <br>
    <p>Email: <b>${user.email}</b></p>
    <p>Password: <b>${password}</b></p>
    <p>Name: <b>${stringUtils.capitalize(user.first_name)} ${stringUtils.capitalize(user.last_name)}</b></p>
    <p>Gender: <b>${user.gender ? stringUtils.capitalize(user.gender) : '--'}</b></p>
    <p>Date of birth: <b>${user.date_of_birth ? (new Date(user.date_of_birth)).toDateString() : '--'}</b></p>
  </div>
  `
  try {
    gsend({
      user: process.env.GMAIL_ACCOUNT,
      pass: process.env.GMAIL_PASSWORD,
      to: user.email,
      subject: 'OH-AUTH CREDENTIAL',
      html: html,
    })({}, (error, result, fullResult) => {
      if (error) console.error(error);
      console.log(result);
    })
  } catch (error) {
    console.log('Sending registration email possibly failed!')
    console.error(error)
  }
}

const resetPassword = async (email, token) => {
  const web_url = `https://elated-engelbart-93990b.netlify.com/reset?token=${token}`
  const html = `
  <div>
    <h3>Follow this link to reset your password</h3>
    <br>
    <p>${web_url}</p>
  </div>
  `
  try {
    gsend({
      user: process.env.GMAIL_ACCOUNT,
      pass: process.env.GMAIL_PASSWORD,
      to: email,
      subject: 'OH-AUTH RESET PASSWORD',
      html: html,
    })({}, (error, result, fullResult) => {
      if (error) console.error(error);
      console.log(result);
    })
  } catch (error) {
    console.log('Sending reset password email possibly failed!')
    console.error(error)
  }
}

module.exports = {
  registration: registration,
  resetPassword: resetPassword
}