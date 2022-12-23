import Queue from '@/adapters/queue'
import { SendText, SendTextOutput } from '@/core/whatsapp/types'

export async function sendText(params: SendText): Promise<SendTextOutput> {
  const queue = Queue.getInstance()

  queue.producer({
    type: 'send:text',
    chatId: params.chatId,
    instanceId: params.instanceId,
    data: {
      base64: params.text,
    },
  })

  return { ok: true }
}
