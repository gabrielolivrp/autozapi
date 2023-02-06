import { DoneCallback, Job } from 'bull'
import Redis from '@/ports/redis'
import Logger from '../logger'
import WhatsApp from '../whatsapp'

class Queue {
  private static instance: Queue
  private queue: Redis<any>

  private constructor() {
    this.queue = new Redis(
      process.env.REDIS_HOST!,
      process.env.REDIS_QUEUE_NAME!,
      this.onMessage
    )
  }

  public static getInstance(): Queue {
    if (!Queue.instance) {
      Queue.instance = new Queue()
    }

    return Queue.instance
  }

  public producer(data: any) {
    return this.queue.producer(data, {})
  }

  private async onMessage(job: Job<any>, done: DoneCallback) {
    const { data: value } = job
    try {
      const whatsApp = WhatsApp.getInstance()

      const instanceId = `${value.applicationId}_${value.sessionId}`
      switch (value.type) {
        case 'send:audio': {
          await whatsApp.sendAudio(instanceId, value.chatId, value.data.base64)
          break
        }
        case 'send:image': {
          await whatsApp.sendFileMessage(
            instanceId,
            value.chatId,
            value.data.base64
          )
          break
        }
        case 'send:text': {
          await whatsApp.sendMessage(instanceId, value.chatId, value.data.text)
          break
        }
      }
    } catch (err: any) {
      Logger.log(
        'fatal',
        `error: \`${err.message}\`\ndata: \`${JSON.stringify(value)}\``
      )
    }
    done()
  }
}

export default Queue
