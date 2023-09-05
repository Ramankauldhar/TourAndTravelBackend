import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: String
    },
    userEmail: {
      type: String,
      unique:true,
    },
    tour:{
      type: String,
    },
    userName: {
      type: String,
      required: true,
    },
    people: {
      type: Number,
      required: true,
    },
    contact: {
      type: Number,
      required: true,
    },
    bookAt:{
        type:Date,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);