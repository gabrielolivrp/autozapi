import Queue from '@/adapters/queue'
import { SendImage, SendImageOutput } from '@/core/whatsapp/types'
import { wrapper } from './wrapper'

export const sendImage = wrapper<SendImage, SendImageOutput>(
  async ({ chatId, instanceId, base64 }) => {
    const queue = Queue.getInstance()

    queue.producer({
      type: 'send:image',
      chatId,
      instanceId,
      data: {
        base64,
      },
    })

    return { ok: true }
  }
)
