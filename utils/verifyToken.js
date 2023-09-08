import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
     const token = localStorage.getItem('token'); // Retrieve the token from localStorage

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Token is Missing or Invalid',
        });
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (error, user) => {
        if (error) {
            return res.status(401).json({
                success: false,
                message: 'Token is invalid',
            });
        }

        req.user = user;
        next(); // Continue to the next middleware/route handler
    });
};

export const verifyUser = (req, res, next) => {
    verifyToken(req, res,  () => {
        if (req.user.id === req.params.id || req.user.role === "user") {
            next();
        } else{
           return res.status(401).json({
                success: false,
                message: "Please Login First."
            });
        }
    });
};

export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.role === "admin") {
            next();
        } else {
            return res.status(401).json({
                success: false,
                message: "Please Login as an admin."
            });
        }
    });
};