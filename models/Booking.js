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
    tourName:{
      type: String,
      required: true,
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
        required:true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);