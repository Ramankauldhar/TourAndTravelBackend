import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

import tourRoutes from './routes/toursRoutes.js';
import usersRoutes from './routes/usersRoutes.js';
import authRoute from './routes/authRoute.js';
import reviewsRoutes from './routes/reviewsRoute.js';
import bookingRoutes from './routes/bookingRoutes.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 8092;
const corsOptions = {
    origin: true,
    credentials: true
}

//MongoDB connection
mongoose.set("strictQuery", false);

const dbConnection = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser:true,
            useUnifiedTopology:true
        });
        console.log("MongoDB is connected!");
    }catch(error){
        console.log('Error while connecting to MongoDB')
    }
};

app.get("/", (req, res) => {
    res.send("API works!");
});

//middleware for the app
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use("/auth", authRoute);
app.use("/tours", tourRoutes);
app.use("/users", usersRoutes);
app.use("/reviews", reviewsRoutes);
app.use("/booking", bookingRoutes);

app.listen(port, () => {
    console.log("Server is running on Post", port);
    dbConnection();
});