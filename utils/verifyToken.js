import jwt from 'jsonwebtoken';
 
export const verifyToken = (req, res, next) =>{
    const token = req.cookies.accessToken;
    
    if(!token){
        return res.status(401).json({
            success: false,
            message: "Incorrect email or password"
        });
    }
    jwt.verify(token, process.env.JWTsecretKey, (error, user) => {
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
        if(req.user.is === req.param.id || req.user.role === "user"){
            next();
        }else{
            return res.status(401).jsohn({
                success:false,
                message:"Incorrect user or password"
            });
        }
    });
}

export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if(req.user.is === req.param.id || req.user.role === "admin"){
            next();
        }else{
            return res.status(401).jsohn({
                success:false,
                message:"Incorrect user or password"
            });
        }
    });
}