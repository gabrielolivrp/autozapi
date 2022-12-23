import { Router } from 'express'
import swaggerUi from 'swagger-ui-express'
import swaggerDocs from '@/../swagger.json'

const swaggerRoutes = Router()

swaggerRoutes.use('/api/docs', swaggerUi.serve)

swaggerRoutes.get(
  '/api/docs',
  swaggerUi.setup(swaggerDocs, {
    swaggerOptions: {
      tagsSorter: 'alpha',
      syntaxHighlight: {
        activate: true,
        theme: 'monokai',
      },
    },
  })
)

export { swaggerRoutes }
