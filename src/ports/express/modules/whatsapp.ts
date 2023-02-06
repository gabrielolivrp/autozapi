import { Router, Request, Response } from 'express'
import { whatsappInstanceMiddleware } from '@/ports/express/middlewares'
import { qrcode, status, logout } from '@/adapters/http/modules'

const whatsAppRoutes = Router()

whatsAppRoutes.get(
  '/api/:applicationId/:sessionId/qrcode',
  whatsappInstanceMiddleware,
  async (req: Request, res: Response) => {
    /*
    #swagger.description = 'Obtem o qrcode de autenticação'
    #swagger.parameters['type'] = {
      in: 'query',
      description: '\"base64\" | \"urlCode\"',
      schema: 'base64'
    }
    */

    const params = {
      instanceId: req.instanceId,
      type: req.query['type'] ?? 'base64',
    } as any
    const result = await qrcode(params)
    res.json(result)
  }
)

whatsAppRoutes.get(
  '/api/:applicationId/:sessionId/status',
  whatsappInstanceMiddleware,
  async (req: Request, res: Response) => {
    /*
    #swagger.description = 'Obtem o status da conexção'
    */
    const params = {
      instanceId: req.instanceId,
    }
    const result = await status(params)
    res.json(result)
  }
)

whatsAppRoutes.post(
  '/api/:applicationId/:sessionId/logout',
  whatsappInstanceMiddleware,
  async (req: Request, res: Response) => {
    /*
    #swagger.description = 'Realiza o logout do dipositivo'
    */
    const params = {
      instanceId: req.instanceId,
      chatId: req.body.chatId,
      base64: req.body.base64,
    }
    const result = await logout(params)
    res.json(result)
  }
)

export { whatsAppRoutes }
