import express from 'express'
import { Server } from '@/core/server'
import { swaggerRoutes, whatsAppRoutes } from './modules'

function server(): Server {
  const app = express()

  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))

  app.use(swaggerRoutes)
  app.use(whatsAppRoutes)

  const start = (port: number) =>
    app.listen(port, () => console.log(`Server is listening on port ${port}`))

  return {
    start,
  }
}

export default server
