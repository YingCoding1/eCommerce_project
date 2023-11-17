import {getRepository} from "typeorm";
import {Payment} from "../entity/Payment";
import {NextFunction, Request, Response} from "express";
import {Err, ErrStr, HttpCode} from "../helper/Err";
import {validate} from "class-validator";
import {IdCheckRes, MkController} from "./MkController";
import {PaymentStatusController} from "./PaymentStatusController";
import {PaymentTypeController} from "./PaymentTypeController";


export class PaymentController extends MkController {
    public static get repo() {
        return getRepository(Payment)
    }

    static async all(request: Request, response: Response, next: NextFunction) {
        let payments = []
        try {
            payments = await PaymentController.repo.find()
        } catch (e) {
            return response.status(404).send(new Err(HttpCode.E404, ErrStr.ErrGet, e))
        }
        return response.status(200).send(new Err(HttpCode.E200, ErrStr.OK, payments))
    }

    static async one(request: Request, response: Response, next: NextFunction) {
        const {paymentId} = request.params

        if (!paymentId) {
            return response.status(400).send(new Err(HttpCode.E400, ErrStr.ErrMissingParameter))
        }

        let payment = null

        try {
            payment = await PaymentController.repo.findOneOrFail(paymentId)
        } catch (e) {
            return response.status(404).send(new Err(HttpCode.E404, ErrStr.ErrGet, e))
        }
        return response.status(200).send(new Err(HttpCode.E200, ErrStr.OK, payment))

    }

    static async validatePayment(paymentStatus: number, paymentType: number) {
        if (typeof paymentStatus != 'number' || paymentStatus <= 0 || typeof paymentType != 'number' || paymentType <= 0) {
            throw (new Err(HttpCode.E400, ErrStr.ErrInvalidId))
        }

        let res: IdCheckRes[] = []

        try {
            let temp = await PaymentController.checkIdExits(paymentStatus, PaymentStatusController.repo)
            if (temp.index !== -1) {
                throw (new Err(HttpCode.E400, ErrStr.ErrInvalidId + temp.index))
            }
            res.push(temp)

            temp = await PaymentController.checkIdExits(paymentType, PaymentTypeController.repo)

            if (temp.index !== -1) {
                throw (new Err(HttpCode.E400, ErrStr.ErrInvalidId + temp.index))
            }
            res.push(temp)

        } catch (e) {
            throw (new Err(HttpCode.E400, ErrStr.ErrInvalidId, e))
        }

        return res
    }


    static async create(request: Request, response: Response, next: NextFunction) {
        let {cardNumber, paymentType, paymentStatus, expiryYear, expiryMonth} = request.body

        let payment = new Payment()

        payment.cardNumber = cardNumber
        payment.expiryMonth = expiryMonth
        payment.expiryYear = expiryYear

        try {
            const errors = await validate(payment)
            if (errors.length > 0) {
                return response.status(400).send(new Err(HttpCode.E400, ErrStr.ErrValidate, errors))
            }

            let res = await PaymentController.validatePayment(paymentStatus, paymentType)

            payment.paymentStatus = res[0].entities[0]
            payment.paymentType = res[1].entities[0]

            await PaymentController.repo.save(payment)

        } catch (e) {
            return response.status(400).send(new Err(HttpCode.E400, ErrStr.ErrStore, e))
        }

        return response.status(200).send(new Err(HttpCode.E200, ErrStr.OK, payment))
    }

    static async update(request: Request, response: Response, next: NextFunction) {
        const {paymentId} = request.params

        if (!paymentId) {
            return response.status(400).send(new Err(HttpCode.E400, ErrStr.ErrMissingParameter))
        }

        let payment = null

        try {
            payment = await PaymentController.repo.findOneOrFail(paymentId)
        } catch (e) {
            return response.status(404).send(new Err(HttpCode.E404, ErrStr.ErrGet, e))
        }

        let {cardNumber, cardHolderName, cvv, paymentType, paymentStatus, expiryDate} = request.body

        payment.cardNumber = cardNumber
        payment.cardHolderName = cardHolderName
        payment.cvv = cvv
        payment.expiryDate = expiryDate

        try {
            const errors = await validate(payment)
            if (errors.length > 0) {
                return response.status(400).send(new Err(HttpCode.E400, ErrStr.ErrValidate, errors))
            }

            let res = await PaymentController.validatePayment(paymentStatus, paymentType)

            payment.paymentStatus = res[0].entities[0]
            payment.paymentType = res[1].entities[0]

            await PaymentController.repo.save(payment)

        } catch (e) {
            return response.status(400).send(new Err(HttpCode.E400, ErrStr.ErrStore, e))
        }

        return response.status(200).send(new Err(HttpCode.E200, ErrStr.OK, payment))

    }

    static async delete(request: Request, response: Response, next: NextFunction) {

    }


}
