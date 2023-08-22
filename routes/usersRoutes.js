import express from "express";
import {
    getAllUserData,
    updateUserData,
    deleteUserData,
    getUserDataById
    } 
    from "./../controllers/userController.js";

const router = express.Router();

import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

//update user data by id
//http://localhost:4042/auth/login
router.put('/:id', verifyUser, updateUserData);
//delete user data by id
router.delete('/:id', verifyUser, deleteUserData);
//get all user data
router.get('/', verifyAdmin, getAllUserData);
//get one particular user's data by id
router.get('/:id', verifyUser, getUserDataById);

export default router;