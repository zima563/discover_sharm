import express from "express";
import {
//   addAvailability,
//   checkAvailability,
//   deleteAvaliability,
  getAvailabilies,
//   updateAvaliability,
} from "./availability.controller.js";
// import { validation } from "../../middleware/validation.js";
// import { availabilityVal } from "./availability.validation.js";
// import { idVal } from "../../utils/idVal.js";

const availRouter = express.Router();

// availRouter.route("/add").post(validation(availabilityVal),addAvailability);

// availRouter.route("/check").post(checkAvailability);
availRouter.route("/all").get(getAvailabilies);

// availRouter.route("/:id").put(validation(idVal),updateAvaliability).delete(validation(idVal),deleteAvaliability);

export default availRouter;
