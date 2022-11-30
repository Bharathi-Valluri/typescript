import express from 'express'
import * as user from '../controllers/user'
const router = express.Router()

router.post('/saveData', user.add)
router.get('/find', user.find)
router.put('/updating', user.updateRecord)
router.delete('/remove', user.deleteRecord)

export { router }
