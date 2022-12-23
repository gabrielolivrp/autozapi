import Queue from '@/adapters/queue'
import { SendImage, SendImageOutput } from '@/core/whatsapp/types'

export async function sendImage(params: SendImage): Promise<SendImageOutput> {
  const queue = Queue.getInstance()

  queue.producer({
    type: 'send:image',
    chatId: params.chatId,
    instanceId: params.instanceId,
    data: {
      base64: params.base64,
    },
  })

  return { ok: true }
}
