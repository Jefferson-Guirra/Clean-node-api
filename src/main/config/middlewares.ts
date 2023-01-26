import express, { Express } from 'express'
import { bodyParser, contentType, cors } from '../middlewares'

export default (app: Express): void => {
  app.use(bodyParser)
  app.use(cors)
  app.use(contentType)
  app.use(express.urlencoded({ extended: true }))
}
