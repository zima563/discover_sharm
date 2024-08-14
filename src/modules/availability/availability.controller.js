import { availability } from "../../../DB/models/availability.model.js";
import { catchError } from "../../middleware/catchError.js";
import { apiError } from "../../utils/apiError.js";
import { SequelizeFeatures } from "../../utils/apiFeatures.js";


const getAvailabilies = catchError(async (req, res) => {
  const countDocuments = await availability.count();

  let sequelizeFeatures = new SequelizeFeatures(availability, req.query)
    .paginate(countDocuments) // Paginate based on the total count and request query
    .filter() // Apply filtering criteria
    .sort() // Apply sorting criteria
    .search("availability") // Apply search criteria
    .limitedFields(); // Select specific fields to return

  const availabilities = await sequelizeFeatures.buildQuery();

  res.json({
    msg: "success",
    paginationResult: sequelizeFeatures.paginationResult,
    availabilities,
  });
});

// const checkAvailability = catchError(async (req, res, next) => {
//   const { date, numberOfAdults, numberOfChild } = req.body;

//   let totalNum = numberOfAdults + numberOfChild;

//   let available = await availability.findOne({ where: { date } });
//   !available && next(new apiError("not availability ticket in that date", 404));

//   let availableSpots = available.maxCapacity - available.booked;

//   if (availableSpots >= totalNum) {
//     res.json({ msg: "Available", availableSpots });
//   } else {
//     res.json({ msg: "Not Available", availableSpots });
//   }
// });



export {
  getAvailabilies,
};
