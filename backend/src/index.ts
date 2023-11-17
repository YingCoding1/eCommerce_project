import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import routes from "./routes";


const SERVER_PORT = 3001

createConnection().then(async connection => {

    // create express app
    const app = express();

    // cors policy
    const cors = require('cors')

    const redis = require('redis')

    const fileUpload = require("express-fileupload");

    app.use(fileUpload())

    // Call middlewares
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(cors())

    // register express routes from defined application routes
    // setup express app here
    app.use('/', routes)

    // start express server
    app.listen(SERVER_PORT);

    console.log(`Express server has started on port ${SERVER_PORT}. Open http://localhost:${SERVER_PORT} to see results`);

}).catch(error => console.log(error));
