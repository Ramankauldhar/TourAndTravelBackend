import jwt from 'jsonwebtoken';
 
export const verifyToken = (req, res, next) =>{
    const token = req.cookies.accessToken;
    
    if(!token){
        return res.status(401).json({
            success: false,
            message: "You are not authorized. Please Login First."
        });
    }
    jwt.verify(token, process.env.JWT_SECRET_KEY, (error, user) => {
        if(error){
            return res.status(401).json({
                success: false,
                message: "Token is invalid"
            })
        }
        req.user = user;
        next(); //for next operation
    })
}

export const verifyUser = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if(req.user.id === req.params.id || req.user.role === "user"){
            next();
        }else{
            return res.status(401).json({
                success:false,
                message:"Please Login First."
            });
        }
    });
}

export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if(req.user.role === "admin"){
            next();
        }else{
            return res.status(401).json({
                success:false,
                message:"Please Login First."
            });
        }
    });
}