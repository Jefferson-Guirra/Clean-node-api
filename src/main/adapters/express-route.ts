import { Controller, HttpRequest, HttpResponse } from '../../presentation/protocols'
import { Request, Response } from 'express'

export const adaptRoute = (controlLer: Controller) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body
    }
    const httpResponse = await controlLer.handle(httpRequest) as HttpResponse
    if (httpResponse.statusCode === 200) {
      res.status(httpResponse.statusCode).json(httpResponse.body)
    } else {
      res.status(httpResponse.statusCode).json({ error: httpResponse.body.message })
    }
  }
}
