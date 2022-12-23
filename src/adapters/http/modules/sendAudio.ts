import Queue from '@/adapters/queue'
import { SendAudio, SendAudioOutput } from '@/core/whatsapp/types'

export async function sendAudio(params: SendAudio): Promise<SendAudioOutput> {
  const queue = Queue.getInstance()

  queue.producer({
    type: 'send:audio',
    chatId: params.chatId,
    instanceId: params.instanceId,
    data: {
      base64: params.base64,
    },
  })

  return { ok: true }
}
