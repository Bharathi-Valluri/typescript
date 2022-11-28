// import { Console } from 'console'
import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
const env = dotenv.config()
import { router } from '../source/routes/routes'
import { db } from './config/db'
const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())
// app.use('/',router)
async function run () {
  app.use('/', router)

  app.listen(process.env.PORT, (): void => {
    console.log(`server is running at ${process.env.PORT}`)
  })
}
run()
