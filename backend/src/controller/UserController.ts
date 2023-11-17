import {getRepository} from "typeorm";
import {User} from "../entity/User";
import {NextFunction, Request, Response} from "express";
import {validate} from "class-validator";
import {Err, ErrStr, HttpCode} from "../helper/Err";
import * as jwt from 'jsonwebtoken';
import config from '../helper/config';


export class UserController {
    public static get repo() {
        return getRepository(User)
    }

    static async create(request: Request, response: Response, next: NextFunction) {
        const {username, password} = request.body
        let user = new User()

        user.password = password
        user.username = username

        // hash password
        user.hashPassword()

        try {
            const errors = await validate(user)
            if (errors.length > 0) {
                return response.status(400).send(new Err(HttpCode.E400, ErrStr.ErrValidate))
            }
            let userName = await UserController.repo.findOne({where: {username}})
            if (userName) {
                return response.status(400).send(new Err(HttpCode.E400, ErrStr.ErrUserExist))
            }
            await UserController.repo.save(user)
        } catch (e) {
            return response.status(400).send(new Err(HttpCode.E400, ErrStr.ErrStore, e))
        }

        return response.status(200).send(new Err(HttpCode.E200, ErrStr.OK, user))

    }

    static async login(request: Request, response: Response, next: NextFunction) {
        const {username, password} = request.body
        let user = new User()

        user.password = password
        user.username = username

        let token = null

        let loggedUser = null

        try {
            const errors = await validate(user)
            if (errors.length > 0) {
                return response.status(400).send(new Err(HttpCode.E400, ErrStr.ErrValidate))
            }

            // check if user exists
            loggedUser = await UserController.repo.findOne({where: {username}})
            if (!loggedUser) {
                return response.status(400).send(new Err(HttpCode.E400, ErrStr.ErrUsername))
            }

            // check if encrypted password match
            if (!loggedUser.checkIfUnencryptedPasswordIsValid(password)) {
                return response.status(400).send(new Err(HttpCode.E400, ErrStr.ErrIncorrectLogin))
            }

            // creat a token for 2 hour
            token = jwt.sign({email: user.username, password: user.password}, config.jwtSecret, {expiresIn: '2h'})

        } catch (e) {
            return response.status(400).send(new Err(HttpCode.E400, ErrStr.ErrAuth, e))
        }

        return response.status(200).send(new Err(HttpCode.E200, ErrStr.OK, {token: token, user: loggedUser}))

    }
}