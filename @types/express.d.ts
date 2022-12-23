declare namespace Express {
  interface Request {
    producer: (data: any) => boolean
    instanceId: string
  }
}
