import {Between, getRepository, LessThan, LessThanOrEqual, MoreThan, MoreThanOrEqual} from "typeorm";
import {Order} from "../entity/Order";
import {NextFunction, Request, Response} from "express";
import {Err, ErrStr, HttpCode} from "../helper/Err";
import {IdCheckRes, MkController} from "./MkController";
import {validate} from "class-validator";
import {OrderStatusController} from "./OrderStatusController";
import {PaymentController} from "./PaymentController";
import {promisify} from "util";
import {UserController} from "./UserController";


const DEFAULT_EXPIRATION = 3600

const redis = require('redis')
const redisClient = redis.createClient()
const getAsync = promisify(redisClient.get).bind(redisClient);

export class OrderController extends MkController {
    public static get repo() {
        return getRepository(Order)
    }

    static async all(request: Request, response: Response, next: NextFunction) {

        let orders = []

        let currentDate = new Date()

        const {filterIndex, userIndex} = request.query

        const filterId = parseInt(filterIndex as any) || 1

        const userId = parseInt(userIndex as any)

        try {

            if (filterId === 1) {
                orders = await OrderController.repo.find({
                    where: {
                        user: userId
                    },
                    order: {
                        create: 'DESC'
                    }
                })

            } else if (filterId === 2) {
                currentDate.setMonth(currentDate.getMonth() - 6)
                const redisOrders = await getAsync(`redisOrders${userIndex}`)
                if (redisOrders != null) {
                    console.log(`Cache Hit redisOrders${userIndex}`)
                    orders = JSON.parse(redisOrders)
                } else {
                    console.log("Cache Miss")
                    orders = await OrderController.repo.find({
                        where: {
                            create: MoreThan(currentDate),
                            user: userId
                        },
                        order: {
                            create: 'DESC'
                        }
                    })
                    redisClient.setex(`redisOrders${userIndex}`, DEFAULT_EXPIRATION, JSON.stringify(orders))
                }

            } else {
                currentDate.setMonth(currentDate.getMonth() - 12)
                console.log(currentDate)
                orders = await OrderController.repo.find({
                    where: {
                        create: MoreThan(currentDate),
                        user: userId
                    },
                    order: {
                        create: 'DESC'
                    }
                })
            }

        } catch (e) {
            return response.status(404).send(new Err(HttpCode.E404, ErrStr.ErrGet, e))
        }

        return response.status(200).send(new Err(HttpCode.E200, ErrStr.OK, orders))
    }

    static async one(request: Request, response: Response, next: NextFunction) {
        const {orderId} = request.params

        if (!orderId) {
            return response.status(400).send(new Err(HttpCode.E400, ErrStr.ErrMissingParameter))
        }

        let order = null

        try {
            order = await OrderController.repo.findOneOrFail(orderId)
        } catch (e) {
            return response.status(404).send(new Err(HttpCode.E404, ErrStr.ErrGet, e))
        }

        return response.status(200).send(new Err(HttpCode.E200, ErrStr.OK, order))

    }

    static async validateOrder(orderStatus: number, payment: number, user: number) {
        if (typeof orderStatus != 'number' || orderStatus <= 0 || typeof payment != 'number' || payment <= 0 || typeof user != 'number' || user <= 0) {
            throw (new Err(HttpCode.E400, ErrStr.ErrInvalidId))
        }

        let res: IdCheckRes[] = []

        try {
            let temp = await OrderController.checkIdExits(orderStatus, OrderStatusController.repo)
            if (temp.index !== -1) {
                throw (new Err(HttpCode.E400, ErrStr.ErrInvalidId + temp.index))
            }
            res.push(temp)

            temp = await OrderController.checkIdExits(payment, PaymentController.repo)

            if (temp.index !== -1) {
                throw (new Err(HttpCode.E400, ErrStr.ErrInvalidId + temp.index))
            }
            res.push(temp)

            temp = await OrderController.checkIdExits(user, UserController.repo)

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
        let {itemTotal, taxRate, tax, total, products, orderStatus, payment, user} = request.body

        let order = new Order()

        order.itemTotal = itemTotal
        order.taxRate = taxRate
        order.tax = tax
        order.total = total
        order.products = products
        // console.log('o1')
        try {
            // console.log('o2')
            const errors = await validate(order)
            if (errors.length > 0) {
                return response.status(400).send(new Err(HttpCode.E400, ErrStr.ErrValidate, errors))
            }
            // console.log('o3')
            let res = await OrderController.validateOrder(orderStatus, payment, user)

            // console.log('o4')
            order.orderStatus = res[0].entities[0]
            order.payment = res[1].entities[0]
            order.user = res[2].entities[0]


            console.log(order)

            await OrderController.repo.save(order)

            redisClient.flushall()

        } catch (e) {
            return response.status(400).send(new Err(HttpCode.E400, ErrStr.ErrStore, e))
        }
        // console.log('o6')
        return response.status(200).send(new Err(HttpCode.E200, ErrStr.OK, order))
    }

    static async update(request: Request, response: Response, next: NextFunction) {
        const {orderId} = request.params

        if (!orderId) {
            return response.status(400).send(new Err(HttpCode.E400, ErrStr.ErrMissingParameter))
        }

        let order = null

        try {
            order = await OrderController.repo.findOneOrFail(orderId)
        } catch (e) {
            return response.status(404).send(new Err(HttpCode.E404, ErrStr.ErrGet, e))
        }

        let {itemTotal, taxRate, tax, total, products, orderStatus, payment, user} = request.body

        order.itemTotal = itemTotal
        order.taxRate = taxRate
        order.tax = tax
        order.total = total
        order.products = products
        // console.log('o1')
        try {
            // console.log('o2')
            const errors = await validate(order)
            if (errors.length > 0) {
                return response.status(400).send(new Err(HttpCode.E400, ErrStr.ErrValidate, errors))
            }
            // console.log('o3')
            let res = await OrderController.validateOrder(orderStatus, payment, user)

            // console.log('o4')
            order.orderStatus = res[0].entities[0]
            order.payment = res[1].entities[0]
            order.user = res[2].entities[0]

            console.log(order)

            await OrderController.repo.save(order)

        } catch (e) {
            return response.status(400).send(new Err(HttpCode.E400, ErrStr.ErrStore, e))
        }
        // console.log('o6')
        return response.status(200).send(new Err(HttpCode.E200, ErrStr.OK, order))

    }

    static async delete(request: Request, response: Response, next: NextFunction) {

    }


}