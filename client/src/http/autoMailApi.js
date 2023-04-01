/*import dotenv from 'dotenv'
import nodemailer from 'nodemailer'

//dotenv.config()

//const { EMAIL_HOST, EMAIL_HOST_PASSWORD, EMAIL_HOST_USER, EMAIL_PORT } = process.env

class Mail {
  #transporter = null

  constructor() {
    this.#transporter = this.#getTransporter()
  }

  #getTransporter() {
    return nodemailer.createTransport({
      host: 'sandbox8924b4d9d59c45dc9f3c80ecf501f530.mailgun.org',
      port: 587,
      secure: false,
      auth: {
        user: 'pubkey-6f10be2f16698a8155742982446e1965',
        pass: "8fc580e64636c296d59ff6833795a23a-15b35dee-be718258"
      }      
    })
  }

  async send(reciever, message) {
    try {
      const info = await this.#transporter.sendMail({
        from: 'test@gmail.com',
        to: reciever,
        subject: 'Welcome to Test site',
        text: message,
        html: `<b>${message}</b>`
      })
      return info.messageId
    } catch(e) {
      return e
    }
  }

}

export default new Mail()


 */