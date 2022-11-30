import express from 'express'
import * as user from '../controllers/user'
const router = express.Router()

router.post('/saveData', user.add)
router.get('/find', user.find)
// router.get('/posts/:id', userController.getPost);
router.put('/updating', user.updateRecord)
router.delete('/remove', user.deleteRecord)
// router.post('/posts', controller.addPost);

export { router }
