// import { Console } from 'console'
import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import * as dotenv from 'dotenv'
dotenv.config()
import { router } from '../source/routes/routes'
// import { db } from './config/db'
const app = express()
const PORT = 5080
//var util = require('util')
//var encoder = new util.TextEncoder('utf-8')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())
// app.use('/',router)
async function run () {
  app.use('/', router)

  app.listen(PORT, (): void => {
    console.log(`server is running at ${PORT}`)
  })
}
run()
