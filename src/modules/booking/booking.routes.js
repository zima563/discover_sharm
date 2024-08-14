import express from "express";
import {
  addContent,
  bookingProcessing,
  checkOutSession,
  createBooking,
  getBookinkg,
} from "./booking.controller.js";
import { validation } from "../../middleware/validation.js";
import { addContentVal, createBookingVal } from "./booking.vaildation.js";

const bookingRouter = express.Router();

bookingRouter
  .route("/createBooking/:id")
  .post(validation(createBookingVal), createBooking);

bookingRouter
  .route("/addContent")
  .put(validation(addContentVal), bookingProcessing, addContent);

bookingRouter.route("/summarybooking").get(bookingProcessing, getBookinkg);

bookingRouter.route("/pay").post(bookingProcessing, checkOutSession);

export default bookingRouter;
