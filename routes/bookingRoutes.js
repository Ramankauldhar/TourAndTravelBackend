import express from 'express';
import { createTourBooking, getAllBookingData, getOneBookingData,  getUserBookings } from './../controllers/bookingController.js';
import { verifyUser, verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router();

//http://localhost:4042/booking (POST)
router.post('/', verifyUser, createTourBooking);
//http://localhost:4042/booking/id (GET)
router.get('/:id', verifyUser, getOneBookingData);
//http://localhost:4042/booking (GET)
router.get('/', verifyAdmin, getAllBookingData);
//http://localhost:4042/booking/id (GET)
router.get('/user/:id', verifyUser, getUserBookings);

export default router;