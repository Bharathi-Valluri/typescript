import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
const PORT = 6000
import dotenv from 'dotenv'
dotenv.config()
import { router } from '../source/routes/routes'
const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())
function run () {
  app.use('/', router)

  app.listen(PORT, (): void => {
    console.log(`server is running at ${PORT}`)
  })
}
run()
