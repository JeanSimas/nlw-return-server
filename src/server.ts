import { prisma } from './prisma'
import express, { Request, Response } from 'express'
import nodemailer from 'nodemailer'

const app = express()

app.use(express.json())
const transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: 'bfd80fce4c876c',
    pass: 'b108d279cd38c7'
  }
})

app.post('/feedbacks', async (request: Request, response: Response) => {
  const { type, comment, screenshot } = request.body

  const feedback = await prisma.feedback.create({
    data: {
      type,
      comment,
      screenshot
    }
  })

  transport.sendMail({
    from: 'Equipe Feedget <oi@feedget.com>',
    to: 'Jean Simas <jeansimas12@hotmail.com>',
    subject: 'Novo feedback',
    html: [
      '<div style="font-family: san-serif; font-size: 16px; color: #111;">',
      `<p>Tipo do feedback: ${type}</p>`,
      `<p>Commentário: ${comment}</p>`
    ].join('\n')
  })

  response.status(201).json({ data: feedback })
})

app.listen(3333, () => console.log('HTTP server running on localhost:3333'))
