declare namespace NodeJS {
  interface ProcessEnv {
    PORT?: number
    HOST?: string
    RABBITMQ_HOST?: string
    RABBITMQ_QUEUE_NAME?: string
  }
}
