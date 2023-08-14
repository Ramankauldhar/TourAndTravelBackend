import User from '../models/Users.js';

//get User data
//http://localhost:4042/tours (GET method)
export const getAllUserData = async(req,res) =>{
    try{
         const allUsers = await User.find({});
         res.status(200).json({
            success:true,
            message:"All records found!",
            data:allUsers
        });
    }catch(error){
        res.status(404).json({
            success:false,
            message:"Records not found"
        });
    }
}

//update User data
//http://localhost:4042/tours/id (PUT method)
export const updateUserData = async(req,res) =>{
    const id = req.params.id;
    try{
        const updateUser = await User.findByIdAndUpdate(id,{
             $set:req.body
        }, {new:true}
        )
         res.status(200).json({
            success:true,
            message:"Successfully updated the user data!",
            data: updateUser
        });
    }catch(error){
        res.status(500).json({
            success:false,
            message:"Error while updating the data. Try again"
        });
    }
}
//delete User data
//http://localhost:4042/tours/id (DELETE method)
export const deleteUserData = async(req,res) =>{
    const id = req.params.id;
    try{
         await User.findByIdAndDelete(id);
         res.status(200).json({
            success:true,
            message:"Successfully deleted the user data!",
        });
    }catch(error){
        res.status(500).json({
            success:false,
            message:"Error while deleting the data. Try again"
        });
    }
}

//get user data by Id
//http://localhost:4042/tours/id (GET method)
export const getUserDataById = async(req,res) =>{
    const id = req.params.id;
    try{
         const userData = await User.findById(id);
         res.status(200).json({
            success:true,
            message:"Record Found!",
            data:userData
        });
    }catch(error){
        res.status(404).json({
            success:error,
            message:"Record not found"
        });
        console.log(error);
    }
}