import express from 'express';
import { UsersController } from '../controllers/userController.js';

const jwtRouter = express.Router();

jwtRouter
    .post("/create", UsersController.createByJson)
    .post("/login",  UsersController.login)

export default jwtRouter;

