import Booking from "../models/booking.js";

export function createBooking(req,res){
    
    var starting = 1000;

    Booking.countDocuments({}).then(
        (count)=>{
          console.log(count);
        }
    )
}