import {NextFunction, Request, Response} from "express";
import {Err, ErrStr, HttpCode} from "../helper/Err";

const stripe = require('stripe')('sk_test_51LvnhrJqGKkfZWyJAlDSuJ00XK0MgcnY');


export class StripeController {

    static async create(request: Request, response: Response, next: NextFunction) {
        const {total} = request.body

        try {
            const paymentIntent = await stripe.paymentIntents.create({
                amount: total,
                currency: "cad",
                automatic_payment_methods: {
                    enabled: true,
                },
            });
            response.send({clientSecret: paymentIntent.client_secret})
        } catch (e) {
            return response.status(400).send({error: {message: e.message}})
        }

        // return response.status(200).send(new Err(HttpCode.E200, ErrStr.OK))
    }

    static async one(request: Request, response: Response, next: NextFunction) {
        const {id} = request.params
        try {
            const paymentMethod = await stripe.paymentMethods.retrieve(id)
            response.send({payment: paymentMethod.card})
        } catch (e) {
            return response.status(400).send({error: {message: e.message}})
        }

        // return response.status(200).send(new Err(HttpCode.E200, ErrStr.OK))
    }
}