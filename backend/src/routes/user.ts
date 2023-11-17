import {Router} from "express";

import {UserController} from "../controller/UserController";

const router = Router()

// restful api
// route parameter
// router.get('/', UserController.all)
// router.get('/:studentId', UserController.one)
router.post('/create', UserController.create)
router.post('/login', UserController.login)
// router.delete('/:studentId', UserController.delete)

export default router