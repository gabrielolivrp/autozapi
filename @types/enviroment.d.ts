declare namespace NodeJS {
  interface ProcessEnv {
    PORT?: number
    HOST?: string
    REDIS_HOST: string
    REDIS_QUEUE_NAME: string
  }
}
