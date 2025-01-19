import express from "express"
import getAllBooking, { createBooking } from "../controllers/bookingController.js"

const bookingRouter = express.Router()

bookingRouter.post("/",createBooking)
bookingRouter.get("/",getAllBooking)

export default bookingRouter;