import User from '../models/Users.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

//to register a new user
//http://localhost:4042/auth/register
export const register = async (req,res) =>{
    try{
        //hashing the user password
        const salt=bcrypt.genSaltSync(8);
        const hash=bcrypt.hashSync(req.body.pswd, salt);

        const newUser = new User({
            userName: req.body.userName,
            userEmail: req.body.userEmail,
            pswd: hash,
            photo: req.body.photo
        })

        await newUser.save();

        res.status(200).json({
            success: true,
            message: "Successfully added a new user"
        })
    }catch(error){
        res.status(500).json({
            success:false,
            message: "Failed to add new user"
        })
    }
};

export const login = async (req,res) =>{
    const userEmail = req.body.userEmail;
    try{
        const user = await User.findOne({userEmail})
        if(!user){
            return res.status(404).json({
            success: false,
            message: "User not found"
        });
        }

       const matchPswd = await bcrypt.compare(req.body.pswd, user.pswd);
       if (!matchPswd){
            return res.status(401).json({
                success: false,
                message: "Incorrect Email or Password"
            });
        }
        const { pswd, role, ...rest} = user._doc;

        //create a jwt token
        const token = jwt.sign(
            {id:user._id, role:user.role},
            process.env.JWT_SECRET_KEY,
            {expiresIn: "200d"}
        );

        //set token in the browser cookies and send response to the client
        res.cookie('accessToken', token, {
            httpOnly: true,
            expires: token.expiresIn
        }).status(200).json({
            token,
            data: { ... rest }, 
            role
        })
    }catch(error){
        res.status(500).json({
                success: false,
                message: "Failed to login."
            });
    }
}