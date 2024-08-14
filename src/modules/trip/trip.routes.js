import express from "express";
import {
  addTrip,
  deleteTrip,
  getTrip,
  getTrips,
  updateTrip,
} from "./trip.controller.js";
import { addTripval, updateTripval } from "./trip.validation.js";
import { validation } from "../../middleware/validation.js";
import { idVal } from "../../utils/idVal.js";

const tripRouter = express.Router();

tripRouter.route("/add").post(validation(addTripval), addTrip);
tripRouter.route("/all").get(getTrips);

tripRouter
  .route("/:id")
  .get(validation(idVal), getTrip)
  .put(validation(updateTripval), updateTrip)
  .delete(validation(idVal), deleteTrip);

export default tripRouter;
