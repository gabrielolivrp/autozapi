import { Router, Request, Response } from 'express'
import { whatsappInstanceMiddleware } from '@/ports/express/middlewares'
import {
  qrcode,
  sendImage,
  sendText,
  sendAudio,
  status,
  logout,
} from '@/adapters/http/modules'

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
    // const { applicationId, sessionId } = req.params

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
  '/api/:applicationId/:sessionId/send/text',
  whatsappInstanceMiddleware,
  async (req: Request, res: Response) => {
    /*
    #swagger.description = 'Envia uma mensagem de texto para um determinado número'
    #swagger.parameters['data'] = {
      in: 'body',
      description: '',
      schema: {
        chatId: '553799999999@g.us',
        text: 'foo'
      }
    }
    */

    const params = {
      instanceId: req.instanceId,
      chatId: req.body.chatId,
      text: req.body.text,
    }
    const result = await sendText(params)
    res.json(result)
  }
)

whatsAppRoutes.post(
  '/api/:applicationId/:sessionId/send/audio',
  whatsappInstanceMiddleware,
  async (req: Request, res: Response) => {
    /*
    #swagger.description = 'Envia uma mensagem de audio no formato "ptt", para um determinado número'
    #swagger.parameters['data'] = {
      in: 'body',
      description: '',
      schema: {
        chatId: '553799999999@g.us',
        base64: '...'
      }
    }
    */

    const params = {
      instanceId: req.instanceId,
      chatId: req.body.chatId,
      base64: req.body.base64,
    }
    const result = await sendAudio(params)
    res.json(result)
  }
)

whatsAppRoutes.post(
  '/api/:applicationId/:sessionId/send/image',
  whatsappInstanceMiddleware,
  async (req: Request, res: Response) => {
    /*
    #swagger.description = 'Envia uma imagem para um determinado número'
    #swagger.parameters['data'] = {
      in: 'body',
      description: '',
      schema: {
        chatId: '553799999999@g.us',
        base64: '...'
      }
    }
    */

    const params = {
      instanceId: req.instanceId,
      chatId: req.body.chatId,
      base64: req.body.base64,
    }
    const result = await sendImage(params)
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
