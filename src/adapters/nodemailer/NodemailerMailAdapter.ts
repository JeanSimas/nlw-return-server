import { MailAdapter, SendMailData } from '../MailAdapter'
import nodemailer from 'nodemailer'
export class NodemailerMailAdapter implements MailAdapter {
  async sendMail ({ subject, body }: SendMailData) {
    const transport = nodemailer.createTransport({
      host: 'smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: 'bfd80fce4c876c',
        pass: 'b108d279cd38c7'
      }
    })

    transport.sendMail({
      from: 'Equipe Feedget <oi@feedget.com>',
      to: 'Jean Simas <jeansimas12@hotmail.com>',
      subject,
      html: body
    })
  }
}
