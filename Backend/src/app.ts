import 'reflect-metadata';
import express from "express";
import connectDb from './config/db/connection';
import cors from 'cors';
import { port } from "./config/app.config";
import {InversifyExpressServer} from 'inversify-express-utils';
import container from './config/inversify.config'
import { ErrorHandler } from './handlers/errorHandler';
import { ErrorHandlerMiddleware } from './handlers/errorResponse';
const server=new InversifyExpressServer(container)

const allowedOrigins = ['http://localhost:4200']
const corsOptions = {
  origin: (origin: any, callback: any) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
server.setConfig(app => {
    app.use(express.json())
    app.use(cors(corsOptions))
  })
  server.setErrorConfig(app=>{
    app.use(ErrorHandlerMiddleware(container))
  })
const app=server.build()

connectDb().then(() => {
    app.listen((port.PORT),():void=>{
        console.log('Server running on port', port.PORT)
    })
})
