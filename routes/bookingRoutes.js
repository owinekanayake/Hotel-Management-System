import express from "express"
import getAllBooking, { createBooking, createBookingUsingCategory, retrieveBookingByDate } from "../controllers/bookingController.js"

const bookingRouter = express.Router()

bookingRouter.post("/",createBooking)
bookingRouter.get("/",getAllBooking)
bookingRouter.post("/filter-date",retrieveBookingByDate)
bookingRouter.post("/create-by-category",createBookingUsingCategory)

export default bookingRouter;