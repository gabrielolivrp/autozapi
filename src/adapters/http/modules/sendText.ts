import Queue from '@/adapters/queue'
import { SendText, SendTextOutput } from '@/core/whatsapp/types'
import { wrapper } from './wrapper'

export const sendText = wrapper<SendText, SendTextOutput>(
  async ({ chatId, instanceId, text }) => {
    const queue = Queue.getInstance()

    queue.producer({
      type: 'send:text',
      chatId,
      instanceId,
      data: {
        text,
      },
    })

    return { ok: true }
  }
)
