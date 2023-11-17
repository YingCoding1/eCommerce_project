import {getRepository} from "typeorm";
import {OrderStatus} from "../entity/OrderStatus";
import {NextFunction, Request, Response} from "express";
import {Err, ErrStr, HttpCode} from "../helper/Err";
import {validate} from "class-validator";


export class OrderStatusController {
    public static get repo() {
        return getRepository(OrderStatus)
    }

    static async all(request: Request, response: Response, next: NextFunction) {
        let orderStatuses = []
        try {
            orderStatuses = await OrderStatusController.repo.find()
        } catch (e) {
            return response.status(404).send(new Err(HttpCode.E404, ErrStr.ErrGet, e))
        }
        return response.status(200).send(new Err(HttpCode.E200, ErrStr.OK, orderStatuses))
    }

    static async one(request: Request, response: Response, next: NextFunction) {
        const {orderStatusId} = request.params

        if (!orderStatusId) {
            return response.status(400).send(new Err(HttpCode.E400, ErrStr.ErrMissingParameter))
        }

        let orderStatus = null

        try {
            orderStatus = await OrderStatusController.repo.findOneOrFail(orderStatusId)
        } catch (e) {
            return response.status(404).send(new Err(HttpCode.E404, ErrStr.ErrGet, e))
        }
        return response.status(200).send(new Err(HttpCode.E200, ErrStr.OK, orderStatus))
    }

    static async create(request: Request, response: Response, next: NextFunction) {

        const {status} = request.query

        let orderStatus = new OrderStatus()

        orderStatus.status = String(status)

        try {
            const errors = await validate(orderStatus)
            if (errors.length > 0) {
                return response.status(400).send(new Err(HttpCode.E400, ErrStr.ErrValidate))
            }
            await OrderStatusController.repo.save(orderStatus)
        } catch (e) {
            return response.status(400).send(new Err(HttpCode.E400, ErrStr.ErrStore, e))
        }

        return response.status(200).send(new Err(HttpCode.E200, ErrStr.OK))

    }

    static async update(request: Request, response: Response, next: NextFunction) {
        const {orderStatusId} = request.params

        if (!orderStatusId) {
            return response.status(400).send(new Err(HttpCode.E400, ErrStr.ErrMissingParameter))
        }

        let orderStatus = null

        try {
            orderStatus = await OrderStatusController.repo.findOneOrFail(orderStatusId)
        } catch (e) {
            return response.status(404).send(new Err(HttpCode.E404, ErrStr.ErrGet, e))
        }

        const {status} = request.query

        orderStatus.status = String(status)

        try {
            const errors = await validate(orderStatus)
            if (errors.length > 0) {
                return response.status(400).send(new Err(HttpCode.E400, ErrStr.ErrValidate))
            }
            await OrderStatusController.repo.save(orderStatus)
        } catch (e) {
            return response.status(400).send(new Err(HttpCode.E400, ErrStr.ErrStore, e))
        }

        return response.status(200).send(new Err(HttpCode.E200, ErrStr.OK))

    }

    static async delete(request: Request, response: Response, next: NextFunction) {

    }

}