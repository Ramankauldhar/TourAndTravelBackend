import Tour from '../models/Tour.js';
import Review from '../models/Reviews.js';

//http://localhost:4042/reviews/64d63f363ae13c8fc58a9539
export const addReview = async(req,res) => {

    const selectedTourId = req.params.selectedTourId;
    const newReview = new Review({ ...req.body })

    try{
        const saveReview = await newReview.save();

        //after saving the new review, now needs to update the reviews array of the tour
        await Tour.findByIdAndUpdate(selectedTourId, {
            $push: {reviews: saveReview._id}
        });

        res.status(200).json({
            success: true,
            message: 'Review has been submitted',
            data: saveReview
        });
    }catch(error){
        res.status(500).json({
            success: true,
            message: 'Failed to submit the review.',
            data: saveReview
        })
    }
}