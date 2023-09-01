import Booking from "../models/Booking.js";

//create booking
export const createTourBooking = async ( req, res) => {
    const tourBooking = new Booking(req.body);
    try{
        const saveBookingData = await tourBooking.save();
        res.status(200).json({
            success: true, 
            message: "Your booking is Done!",
            data: saveBookingData
        });
    }catch(error){
        res.status(500).json({
            success: false, 
            message: "Internal server Error",
            
        });
    };
};
//get all booking data
export const getAllBookingData = async(req, res) =>{
    try{
        const bookings = await Booking.find();
        res.status(200).json({
            success: true,
            message: "Result Found!",
            data: bookings
        });
    }catch(error){
        res.status(500).json({
            success: false, 
            message: "Intrenal Server Error."
        });
    }
}


//get booking data by id
export const getOneBookingData = async(req, res) =>{
    const id = req.params.id;
    try{
        const bookings = await Booking.findById(id);
        res.status(200).json({
            success: true,
            message: "Result Found!",
            data: bookings
        });
    }catch(error){
        res.status(404).json({
            success: false, 
            message: "Result not found."
        });
    }
}
export const getUserBookings = async (req, res) => {
  try {
    const userId = req.user.id;

    // Query the bookings for the user ID
    const bookings = await Booking.find({ userId });

    if (!bookings) {
      return res.status(404).json({
        success: false,
        message: "No bookings found for this user.",
      });
    }

    res.status(200).json({
      success: true,
      message: "User bookings retrieved successfully.",
      data: bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
}