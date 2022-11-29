import express from 'express'
import { add, find, updateRecord, deleteRecord } from '../controllers/user'
const router = express.Router()

router.post('/saveData', add)
router.get('/find', find)
// router.get('/posts/:id', userController.getPost);
router.put('/updating', updateRecord)
router.delete('/remove', deleteRecord)
// router.post('/posts', controller.addPost);

export { router }
