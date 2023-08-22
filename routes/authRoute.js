import express from "express";
import {login, register} from '../controllers/authController.js';

const router = express.Router();

//http://localhost:4042/auth/register
router.post('/register', register);

//http://localhost:4042/auth/login
router.post('/login', login);

export default router;
