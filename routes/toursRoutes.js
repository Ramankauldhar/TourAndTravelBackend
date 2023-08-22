import express from "express";
import {addNewTourData, 
    updateTourData, 
    deleteTourData, 
    getAllTourData, 
    getTourDataById, 
    searchTour, 
    getOfferTours,
    getTourCount} from "./../controllers/tourController.js";
import { verifyAdmin } from "../utils/verifyToken.js";    

const router = express.Router();

//Add New tour data
router.post('/', verifyAdmin, addNewTourData);
//update tour data by id
router.put('/:id', verifyAdmin, updateTourData);
//delete tour data by id
router.delete('/:id', verifyAdmin, deleteTourData);
//get all tour data
router.get('/', getAllTourData);
//get one particular tour data by id
router.get('/:id', getTourDataById);


//get tour by serach
router.get('/search/getTourDetails', searchTour);

//get offers
router.get('/offers/getTourOnOffer', getOfferTours);

//get the tour counts
router.get('/counts/getTourCount', getTourCount);

export default router;