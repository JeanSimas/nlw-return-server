import { MailAdapter } from '../adapters/MailAdapter'
import { FeedbacksRepository } from '../repositories/FeedbacksRepository'

interface SubmitFeedbackUseCaseRequest {
  type: string
  comment: string
  screenshot?: string
}

export class SubmitFeedbackUseCase {
  private feedbacksRepository: FeedbacksRepository
  private mailAdapter: MailAdapter
  constructor (feedbacksRepository_: FeedbacksRepository, mailAdapter_: MailAdapter) {
    this.feedbacksRepository = feedbacksRepository_
    this.mailAdapter = mailAdapter_
  }

  async execute (request: SubmitFeedbackUseCaseRequest) {
    const { type, comment, screenshot } = request

    if (!type) throw new Error('Type is required.')

    if (!comment) throw new Error('Comment is required.')

    if (screenshot && !screenshot.startsWith('data:image/png;base64')) { throw new Error('Invalid screenshot format.') }

    await this.feedbacksRepository.create({ type, comment, screenshot })

    await this.mailAdapter.sendMail({
      subject: 'Novo feedback',
      body: [
        '<div style="font-family: san-serif; font-size: 16px; color: #111;">',
        `<p>Tipo do feedback: ${type}</p>`,
        `<p>Commentário: ${comment}</p>`
      ].join('\n')
    })
  }
}
