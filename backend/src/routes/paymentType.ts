import {Router} from "express";
import {PaymentTypeController} from "../controller/PaymentTypeController";


const router = Router()

router.get('/', PaymentTypeController.all)
router.get('/:paymentTypeId', PaymentTypeController.one)
router.post('/', PaymentTypeController.create)
router.put('/:paymentTypeId', PaymentTypeController.update)
router.delete('/:paymentTypeId', PaymentTypeController.delete)


export default router