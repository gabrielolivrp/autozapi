import { NextFunction, Request, Response } from 'express'

export function whatsappInstanceMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  const { applicationId, sessionId } = req.params

  req.instanceId = `${applicationId}_${sessionId}`

  next()
}
