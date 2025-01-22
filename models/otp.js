import mongoose from "mongoose";

const otpSchema = new mongoose.Schema(
    {
        email : {
            type : String,
            required : true
        },
        otp : {
            type : Number,
            required : true
        },
        date : {
            type : Date,
            default : Date.now(),
        }
    }
)

const Otp = mongoose.model("otp",otpSchema);

export default Otp;