import {getRepository, MoreThan} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Err, ErrStr, HttpCode} from "../helper/Err";
import {Review} from "../entity/Review";
import {validate} from "class-validator";
import fileUpload = require("express-fileupload");


export class ReviewController {
    public static get repo() {
        return getRepository(Review)
    }

    static async create(request: Request, response: Response, next: NextFunction) {

        const {productId, comments, rate, title} = request.body

        let review = new Review()

        let data

        if (request.files === null) {
            data = null
        } else {
            // @ts-ignore
            data = request.files.file.data
        }

        review.image = data
        review.productId = productId
        review.title = title
        review.comments = comments
        review.rate = rate
        review.isDelete = false

        console.log(data)
        try {
            const errors = await validate(review)
            if (errors.length > 0) {
                return response.status(400).send(new Err(HttpCode.E400, ErrStr.ErrValidate, errors))
            }

            await ReviewController.repo.save(review)

        } catch (e) {
            return response.status(400).send(new Err(HttpCode.E400, ErrStr.ErrStore, e))
        }
        return response.status(200).send(new Err(HttpCode.E200, ErrStr.OK, review))
    }

    static async one(request: Request, response: Response, next: NextFunction) {
        const {reviewId} = request.params

        if (!reviewId) {
            return response.status(400).send(new Err(HttpCode.E400, ErrStr.ErrMissingParameter))
        }

        let review = null

        try {
            review = await ReviewController.repo.findOneOrFail(reviewId)
        } catch (e) {
            return response.status(404).send(new Err(HttpCode.E404, ErrStr.ErrGet, e))
        }
        response.end(review.image)
        // return response.status(200).send(new Err(HttpCode.E200, ErrStr.OK, review.image))
    }

    static async all(request: Request, response: Response, next: NextFunction) {
        const {productId, page} = request.query
        let reviews = []

        const currentPage = parseInt(page as any) || 1

        try {
            reviews = await ReviewController.repo.find({
                where: {
                    productId: productId
                },
                order: {
                    create: 'DESC'
                },
                take: 5,
                skip: (currentPage - 1) * 5
            })
        } catch (e) {
            console.log('error,write to db', e)
            return response.status(400).send(new Err(HttpCode.E400, ErrStr.ErrStore, e))
        }

        const totalReviews = await ReviewController.repo.count({
            where: {
                productId: productId
            }
        })
        const totalPage = Math.ceil(totalReviews / 5)
        let info =
            {
                totalReviews: totalReviews,
                totalPage: totalPage,
                currentPage: currentPage
            }

        return response.status(200).send(new Err(HttpCode.E200, ErrStr.OK, {info, reviews}))
    }
}