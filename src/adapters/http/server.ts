import server from '@/ports/express'
import setup from './setup'

const { start } = server()

const PORT = process.env.PORT ?? 3333

setup()
  .then(() => start(PORT))
  .catch((err) => console.log(err))
