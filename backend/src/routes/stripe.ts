import {Router} from "express";
import {StripeController} from "../controller/StripeController";


const router = Router()
router.post('/', StripeController.create)
router.get('/:id', StripeController.one)

export default router