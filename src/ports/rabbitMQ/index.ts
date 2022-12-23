import amqp, { Connection, Channel } from 'amqplib/callback_api'

class RabbitMQ {
  private queue: string
  private url: string
  private channel: Channel

  public constructor(
    url: string,
    queue: string,
    onMessage: (msg: amqp.Message | null) => void
  ) {
    this.queue = queue
    this.url = url

    amqp.connect(this.url, (err: Error, conn: Connection) => {
      if (err) throw err

      conn.createChannel((err, ch) => {
        if (err) throw err
        this.channel = ch
        // TODO: Isso deve ficar aqui?
        this.consume(onMessage)
      })
    })
  }

  private consume(onMessage: (msg: amqp.Message | null) => void): void {
    this.channel.assertQueue(this.queue, { durable: true })
    this.channel.consume(this.queue, onMessage, { noAck: true })
  }

  public producer(data: string): boolean {
    return this.channel.sendToQueue(this.queue, Buffer.from(data))
  }
}

export default RabbitMQ
