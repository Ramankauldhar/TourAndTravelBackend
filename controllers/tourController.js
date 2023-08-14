import Tour from '../models/Tour.js';

//add new tour data
//http://localhost:4042/tours (POST method)
export const addNewTourData = async(req,res) =>{
    const newTour = new Tour(req.body);
    try{
        const saveTourData = await newTour.save();
        res.status(200).json({
            success:true,
            message:"Successfully added the new tour data!",
            data: saveTourData
        });
    }catch(error){
        res.status(500).json({
            success:false,
            message:"Error while adding new data. Try again"
        });
    }
}
//get tour data
//http://localhost:4042/tours (GET method)
export const getAllTourData = async(req,res) =>{
    //This is for pagination
    const page = parseInt(req.query.page);

    try{
         const allTours = await Tour.find({ featured: true }).skip(page * 6).limit(6);
         res.status(200).json({
            success:true,
            count: allTours.length,
            message:"All records found!",
            data:allTours
        });
    }catch(error){
        res.status(404).json({
            success:false,
            message:"Records not found"
        });
    }
}

//update tour data
//http://localhost:4042/tours/id (PUT method)
export const updateTourData = async(req,res) =>{
    const id = req.params.id;
    try{
        const updateTour = await Tour.findByIdAndUpdate(id,{
             $set:req.body
        }, {new:true}
        )
         res.status(200).json({
            success:true,
            message:"Successfully updated the tour data!",
            data: updateTour
        });
    }catch(error){
        res.status(500).json({
            success:false,
            message:"Error while updating the data. Try again"
        });
    }
}
//delete tour data
//http://localhost:4042/tours/id (DELETE method)
export const deleteTourData = async(req,res) =>{
    const id = req.params.id;
    try{
         await Tour.findByIdAndDelete(id);
         res.status(200).json({
            success:true,
            message:"Successfully deleted the tour data!",
        });
    }catch(error){
        res.status(500).json({
            success:false,
            message:"Error while deleting the data. Try again"
        });
    }
}

//get tour data by Id
//http://localhost:4042/tours/id (GET method)
export const getTourDataById = async(req,res) =>{
    const id = req.params.id;
    try{
         const tourData = await Tour.findById(id);
         res.status(200).json({
            success:true,
            message:"Record Found!",
            data:tourData
        });
    }catch(error){
        res.status(404).json({
            success:error,
            message:"Record not found"
        });
        console.log(error);
    }
}

//Search a tour by tour name, people and price
//http://localhost:4042/tours/search/getTourDetails?place=japan&minPeople=2&maxPrice=20000
export const searchTour = async (req, res) => {
    const place = req.query.place; 
    const minPeople = parseInt(req.query.minPeople);
    const maxPrice = parseInt(req.query.maxPrice);

    // Build the query object with the provided criteria
    const query = {};

    if (place) {
        query.tour = new RegExp(place, 'i'); // 'i' for case-insensitive
    }

    if (!isNaN(minPeople)) {
        query.people = { $gte: minPeople };
    }

    if (!isNaN(maxPrice)) {
        query.price = { $lte: maxPrice };
    }

    try {
        // Only perform the search if place name, minPeople, and maxPrice criteria are provided
        if (place && !isNaN(minPeople) && !isNaN(maxPrice)) {
            const toursInfo = await Tour.find(query);

            if (toursInfo.length > 0) {
                res.status(200).json({
                    success: true,
                    message: "Successfully found the results",
                    data: toursInfo,
                });
            } else {
                res.status(404).json({
                    success: false,
                    message: "No matching records found",
                });
            }
        } else {
            // If any of the criteria is missing, respond with a message
            res.status(400).json({
                success: false,
                message: "Place name, People, and Price criteria are required",
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "An error occurred while processing the request",
        });
    }
};

//get all the tours on offer
//http://localhost:4042/tours/offers/getTourOnOffer
export const getOfferTours = async(req,res) =>{
    try{
         const offers = await Tour.find({ featured: false }).limit(6);
         res.status(200).json({
            success:true,
            count: offers.length,
            message:"All records found!",
            data: offers
        });
    }catch(error){
        res.status(404).json({
            success:false,
            message:"Records not found"
        });
    }
};

//get Tour Counts
export const getTourCount = async(req,res) =>{
    try{
        const tourCount = await Tour.estimatedDocumentCount();
        res.status(200).json({success:true, data: tourCount});
    }catch(error){
        res.status(500).json({success: false, message:"Failed to fetch the data"});
    }
}
