const nodemailer = require('nodemailer')

class MailService {

  constructor() {
  //   this.transporter = nodemailer.createTransport({
  //     host: "smtp.gmail.com",
  //     port: 465,
  //     secure: false,
  //     auth: {
  //       user: 'artemkuskin7@gmail.com',
  //       pass: 'tamerlan2308',
  //     }
  //   })
   }
   async sendActivationMail(to, link) {
  //   await this.transporter.sendMail({
  //    from:  "artemkuskin7@gmail.com",
  //    to,
  //    subject: 'Актвация аккаунта на ' + 'http://localhost:5000',
  //    text: '',
  //    html:
  //    `
  //    <div>
  //    <h1>Для Активации перейдите по ссылке</h1>
  //    <a href="${link}">${link}</a>
  //    </div>
  //    `
  //   })
    }
}

module.exports = new MailService()