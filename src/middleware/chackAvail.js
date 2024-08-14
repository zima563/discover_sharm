import { availability } from "../../DB/models/availability.model.js";
import { apiError } from "../utils/apiError.js";
import { catchError } from "./catchError.js";

export const checkAvailability = catchError(async (req, res, next) => {
    const { date, numberOfAdults } = req.body;
  
    let available = await availability.findOne({ where: { date } });
    !available && next(new apiError("not availability ticket in that date", 404));
  
    let availableSpots = available.maxCapacity - available.booked;
  
    if (availableSpots >= numberOfAdults) {
      next();
    } else {
        next(new apiError("not availability ticket in that date", 404));
    }
  });