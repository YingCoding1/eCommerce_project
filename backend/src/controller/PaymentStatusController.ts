import {getRepository} from "typeorm";
import {PaymentStatus} from "../entity/PaymentStatus";
import {NextFunction, Request, Response} from "express";
import {Err, ErrStr, HttpCode} from "../helper/Err";
import {validate} from "class-validator";


export class PaymentStatusController {
    public static get repo() {
        return getRepository(PaymentStatus)
    }

    static async all(request: Request, response: Response, next: NextFunction) {
        let paymentStatus = []
        try {
            paymentStatus = await PaymentStatusController.repo.find()
        } catch (e) {
            return response.status(404).send(new Err(HttpCode.E404, ErrStr.ErrGet, e))
        }
        return response.status(200).send(new Err(HttpCode.E400, ErrStr.ErrGet, paymentStatus))

    }

    static async one(request: Request, response: Response, next: NextFunction) {
        const {paymentStatusId} = request.params

        if (!paymentStatusId) {
            return response.status(400).send(new Err(HttpCode.E400, ErrStr.ErrMissingParameter))
        }

        let paymentStatus = null

        try {
            paymentStatus = await PaymentStatusController.repo.findOneOrFail(paymentStatusId)
        } catch (e) {
            return response.status(404).send(new Err(HttpCode.E404, ErrStr.ErrGet, e))
        }
        return response.status(200).send(new Err(HttpCode.E200, ErrStr.OK, paymentStatus))

    }

    static async create(request: Request, response: Response, next: NextFunction) {
        const {status} = request.query

        let paymentStatus = new PaymentStatus()

        paymentStatus.status = String(status)

        try {
            const errors = await validate(paymentStatus)
            if (errors.length > 0) {
                return response.status(400).send(new Err(HttpCode.E400, ErrStr.ErrValidate))
            }
            await PaymentStatusController.repo.save(paymentStatus)
        } catch (e) {
            return response.status(400).send(new Err(HttpCode.E400, ErrStr.ErrStore, e))
        }

        return response.status(200).send(new Err(HttpCode.E200, ErrStr.OK))

    }

    static async update(request: Request, response: Response, next: NextFunction) {
        const {paymentStatusId} = request.params

        if (!paymentStatusId) {
            return response.status(400).send(new Err(HttpCode.E400, ErrStr.ErrMissingParameter))
        }

        let paymentStatus = null

        try {
            paymentStatus = await PaymentStatusController.repo.findOneOrFail(paymentStatusId)
        } catch (e) {
            return response.status(404).send(new Err(HttpCode.E404, ErrStr.ErrGet, e))
        }

        const {status} = request.query

        paymentStatus.status = String(status)

        try {
            const errors = await validate(paymentStatus)
            if (errors.length > 0) {
                return response.status(400).send(new Err(HttpCode.E400, ErrStr.ErrValidate))
            }
            await PaymentStatusController.repo.save(paymentStatus)
        } catch (e) {
            return response.status(400).send(new Err(HttpCode.E400, ErrStr.ErrStore, e))
        }

        return response.status(200).send(new Err(HttpCode.E200, ErrStr.OK))

    }

    static async delete(request: Request, response: Response, next: NextFunction) {

    }


}
