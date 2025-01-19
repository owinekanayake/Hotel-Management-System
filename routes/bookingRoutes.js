import express from "express"
import getAllBooking, { createBooking, retrieveBookingByDate } from "../controllers/bookingController.js"

const bookingRouter = express.Router()

bookingRouter.post("/",createBooking)
bookingRouter.get("/",getAllBooking)
bookingRouter.post("/filter-date",retrieveBookingByDate)

export default bookingRouter;