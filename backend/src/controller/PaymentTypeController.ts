import {getRepository} from "typeorm";
import {PaymentType} from "../entity/PaymentType";
import {NextFunction, Request, Response} from "express";
import {Err, ErrStr, HttpCode} from "../helper/Err";
import {validate} from "class-validator";


export class PaymentTypeController {
    public static get repo() {
        return getRepository(PaymentType)
    }

    static async all(request: Request, response: Response, next: NextFunction) {
        let paymentTypes = []
        try {
            paymentTypes = await PaymentTypeController.repo.find()
        } catch (e) {
            return response.status(404).send(new Err(HttpCode.E404, ErrStr.ErrGet, e))
        }
        return response.status(200).send(new Err(HttpCode.E200, ErrStr.OK, paymentTypes))

    }

    static async one(request: Request, response: Response, next: NextFunction) {
        const {paymentTypeId} = request.params

        if (!paymentTypeId) {
            return response.status(400).send(new Err(HttpCode.E400, ErrStr.ErrMissingParameter))
        }

        let paymentType = null

        try {
            paymentType = await PaymentTypeController.repo.findOneOrFail(paymentTypeId)
        } catch (e) {
            return response.status(404).send(new Err(HttpCode.E404, ErrStr.ErrGet, e))
        }
        return response.status(200).send(new Err(HttpCode.E200, ErrStr.OK, paymentType))

    }

    static async create(request: Request, response: Response, next: NextFunction) {
        const {type} = request.query

        let paymentType = new PaymentType()

        paymentType.type = String(type)

        try {
            const errors = await validate(paymentType)
            if (errors.length > 0) {
                return response.status(400).send(new Err(HttpCode.E400, ErrStr.ErrValidate))
            }
            await PaymentTypeController.repo.save(paymentType)
        } catch (e) {
            return response.status(400).send(new Err(HttpCode.E400, ErrStr.ErrStore, e))
        }

        return response.status(200).send(new Err(HttpCode.E200, ErrStr.OK))

    }

    static async update(request: Request, response: Response, next: NextFunction) {
        const {paymentTypeId} = request.params

        if (!paymentTypeId) {
            return response.status(400).send(new Err(HttpCode.E400, ErrStr.ErrMissingParameter))
        }

        let paymentType = null

        try {
            paymentType = await PaymentTypeController.repo.findOneOrFail(paymentTypeId)
        } catch (e) {
            return response.status(404).send(new Err(HttpCode.E404, ErrStr.ErrGet, e))
        }

        const {type} = request.query

        paymentType.type = String(type)

        try {
            const errors = await validate(paymentType)
            if (errors.length > 0) {
                return response.status(400).send(new Err(HttpCode.E400, ErrStr.ErrValidate))
            }
            await PaymentTypeController.repo.save(paymentType)
        } catch (e) {
            return response.status(400).send(new Err(HttpCode.E400, ErrStr.ErrStore, e))
        }

        return response.status(200).send(new Err(HttpCode.E200, ErrStr.OK))

    }

    static async delete(request: Request, response: Response, next: NextFunction) {

    }


}
