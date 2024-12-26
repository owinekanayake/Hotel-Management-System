import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    bookingId:{
        type : Number,
        require : true,
        unique: true
    },
    roomId : {
        type : Number,
        require : true
    },
    email:{
        type : String,
        require: true
    },
    status:{
        type : String,
        require: true,
        default: "pending"
    },
    reason:{
        type : String,
        default: ""
    },
    start: {
        type:Date,
        require: true
    },
    end:{
        type:Date,
        require: true     
    },
    notes : {
        type: String,
        default : ""
    }
})

const Booking = mongoose.model("Booking",bookingSchema)
export default Booking