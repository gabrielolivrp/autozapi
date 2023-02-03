import Queue from '@/adapters/queue'
import { SendAudio, SendAudioOutput } from '@/core/whatsapp/types'
import { wrapper } from './wrapper'

export const sendAudio = wrapper<SendAudio, SendAudioOutput>(
  async ({ chatId, instanceId, base64 }) => {
    const queue = Queue.getInstance()

    queue.producer({
      type: 'send:audio',
      chatId,
      instanceId,
      data: {
        base64,
      },
    })

    return { ok: true }
  }
)
