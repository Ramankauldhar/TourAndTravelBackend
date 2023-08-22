import express from 'express';
import {addReview} from './../controllers/reviewController.js';
import { verifyUser } from '../utils/verifyToken.js';

const router = express.Router();

//http://localhost:4042/reviews/64d63f363ae13c8fc58a9539
router.post('/:selectedTourId', verifyUser, addReview)

export default router;