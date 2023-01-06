import RabbitMQ from '@/ports/rabbitMQ'
import WhatsApp from '../whatsapp'

class Queue {
  private static instance: Queue
  private queue: RabbitMQ

  private constructor() {
    this.queue = new RabbitMQ(
      process.env.RABBITMQ_HOST!,
      process.env.RABBITMQ_QUEUE_NAME!,
      this.onMessage
    )
  }

  private async onMessage(message: any) {
    if (!message) return
    try {
      const value = JSON.parse(message.content.toString())
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
    } catch (err) {
      console.error(err)
    }
  }

  public producer(data: any) {
    return this.queue.producer(this.encodeMessage(data))
  }

  public encodeMessage(value: any): string {
    if (typeof value === 'string') {
      return value
    }
    return JSON.stringify(value)
  }

  public static getInstance(): Queue {
    if (!Queue.instance) {
      Queue.instance = new Queue()
    }

    return Queue.instance
  }
}

export default Queue
