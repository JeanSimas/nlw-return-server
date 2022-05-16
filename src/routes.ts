import express, { Request, Response } from 'express'
import { PrismaFeedbacksRepository } from './repositories/prisma/PrismaFeedbacksRepository'
import { SubmitFeedbackUseCase } from './use-cases/SubmitFeedbackUseCase'
import { NodemailerMailAdapter } from './adapters/nodemailer/NodemailerMailAdapter'

export const routes = express.Router()

routes.post('/feedbacks', async (request: Request, response: Response) => {
  const { type, comment, screenshot } = request.body

  const prismaFeedbacksRepository = new PrismaFeedbacksRepository()
  const nodemailerMailAdapter = new NodemailerMailAdapter()
  const submitFeedbackUseCase = new SubmitFeedbackUseCase(prismaFeedbacksRepository, nodemailerMailAdapter)

  await submitFeedbackUseCase.execute({ type, comment, screenshot })

  response.status(201).send()
})
