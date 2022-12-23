import RabbitMQ from '@/ports/rabbitMQ'
import WhatsApp from '../whatsapp'

class Queue {
  private static instance: Queue
  private queue: RabbitMQ
  private whatsApp: WhatsApp

  private constructor() {
    this.whatsApp = WhatsApp.getInstance()
    this.queue = new RabbitMQ(
      process.env.RABBITMQ_HOST!,
      process.env.RABBITMQ_QUEUE_NAME!,
      this.onMessage
    )
  }

  private async onMessage(message: any) {
    if (!message) return
    try {
      const value = this.decodeMessage(message.content.toString())
      switch (value.type) {
        case 'send:audio': {
          await this.whatsApp.sendAudio(
            value.instanceId,
            value.chatId,
            value.data.base64
          )
          break
        }
        case 'send:image': {
          await this.whatsApp.sendFileMessage(
            value.instanceId,
            value.chatId,
            value.data.base64
          )
          break
        }
        case 'send:text': {
          await this.whatsApp.sendMessage(
            value.instanceId,
            value.chatId,
            value.data.text
          )
          break
        }
      }
    } catch (err) {}
  }

  public producer(data: any) {
    return this.queue.producer(this.encodeMessage(data))
  }

  private encodeMessage(value: any): string {
    if (typeof value === 'string') {
      return value
    }
    return JSON.stringify(value)
  }

  private decodeMessage(value: string): any {
    return JSON.parse(value)
  }

  public static getInstance(): Queue {
    if (!Queue.instance) {
      Queue.instance = new Queue()
    }

    return Queue.instance
  }
}

export default Queue
