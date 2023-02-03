import Bull, { DoneCallback, Job } from 'bull'

class Redis<A> {
  private queue: string
  private url: string
  private channel: Bull.Queue<A>

  public constructor(
    url: string,
    queue: string,
    onMessage: (job: Job<A>, done: DoneCallback) => void
  ) {
    this.queue = queue
    this.url = url
    this.channel = new Bull<A>(this.queue, this.url)
    this.channel.process(onMessage)
  }

  public async producer(data: A, options: any) {
    await this.channel.add(data, {
      ...options,
      attempts: 2,
      removeOnComplete: true,
    })
  }
}

export default Redis
