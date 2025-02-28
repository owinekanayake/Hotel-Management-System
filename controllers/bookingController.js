import Booking from "../models/booking.js";
import Room from "../models/room.js";
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

export default function getAllBooking(req, res) {
  Booking.find()
    .then((result) => {
      res.json({
        message: "Booking fetched successfully",
        result: result,
      });
    })
    .catch((err) => {
      res.json({
        message: "failed to get all booking",
        error: err,
      });
    });
}

export function retrieveBookingByDate(req, res) {
  const start = req.body.start;
  const end = req.body.end;

  Booking.find({
    start: {
      $gte: new Date(start),
    },
    end: {
      $lt: new Date(end),
    },
  })
    .then((result) => {
      res.json({
        message: "Booking fetched successfully",
        result: result,
      });
    })
    .catch((err) => {
      res.json({
        message: "Failed to get booking",
        error: err,
      });
    });
}

export function createBookingUsingCategory(req, res) {
  const start = new Date(req.body.start);
  const end = new Date(req.body.end);

  Booking.find({
    $or: [
      {
        start: {
          $gte: start,
          $lt: end,
        },
      },
      {
        end: {
          $gt: start,
          $lte: end,
        },
      },
    ],
  }).then((result) => {
    const overlapplingBooking = result;
    const rooms = [];

    for (let i = 0; i < overlapplingBooking.length; i++) {
      rooms.push(overlapplingBooking[i].roomId);
    }

    Room.find({
      roomId: {
        $nin: rooms,
      },
      category: req.body.category,
    }).then((room) => {
      if (room.length == 0) {
        res.json({
          message: "No rooms available",
        });
      } else {
        const startingId = 1200;

        Booking.countDocuments({})
          .then((count) => {
            console.log(count);
            const newId = startingId + count + 1;
            const newBooking = new Booking({
              bookingId: newId,
              roomId: req.body.roomId,
              email: req.body.user.email,
              start: start,
              end: end,
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
    });
  });
}
