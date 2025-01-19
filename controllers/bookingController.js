import Booking from "../models/booking.js";
import { isCustomerValid } from "./userController.js";

export function createBooking(req, res) {
  if (!isCustomerValid(req)) {
    res.status(403).json({
      message: "Forbidden",
    });
    return;
  }

  const startingId = 1200;

  Booking.countDocuments({})
  .then((count) => {
    console.log(count);
    const newId = startingId + count + 1;
    const newBooking = new Booking({
      bookingId: newId,
      roomId: req.body.roomId,
      email: req.body.user.email,
      start: req.body.start,
      end: req.body.end,
    });
    newBooking
      .save()
      .then((result) => {
        res.json({
          message: "Booking created successfully",
          result: result,
        });
      })
      .catch((err) => {
        res.json({
          message: "Booking creation failed",
        });
      });
  })
  .catch((err) => {
    res.json({
      message: "Booking creation failed",
      error: err,
    });
  });
}

export default function getAllBooking(req,res){
  Booking.find().then(
    (result)=>{
      res.json({
        message: "Booking fetched successfully",
        result: result
      })
    }
  ).catch(
    (err)=>{
      res.json({
        message : "failed to get all booking",
        error: err
      })
    }
  )
}

export function retrieveBookingByDate(req,res){
  const start = req.body.start
  const end = req.body.end

  console.log(start);
  console.log(end);
}
