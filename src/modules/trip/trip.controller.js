import { reviewModel } from "../../../DB/models/assoiation.js";
import { tripModel } from "../../../DB/models/assoiation.js";
import { catchError } from "../../middleware/catchError.js";
import { apiError } from "../../utils/apiError.js";

const addTrip = catchError(async (req, res) => {
  let trip = await tripModel.create(req.body);
  res.json({ msg: "success", trip });
});

const getTrips = catchError(async (req, res, next) => {
  let trips = await tripModel.findAll();
  res.json({ msg: "success", trips });
});

const getTrip = catchError(async (req, res, next) => {
  let trip = await tripModel.findOne({
    where: {id: req.params.id},
    include: [{ model: reviewModel , as: "myReviews"}]
  });
  !trip && next(new apiError("not trip found", 404));
  trip && res.json({ msg: "success", trip });
});

const updateTrip = catchError(async (req, res, next) => {
  const trip = await tripModel.update(req.body, {
    where: { id: req.params.id },
  });

  if (!trip) {
    return next(new apiError("trip not found", 404));
  }

  res.json({ msg: "success" });
});

const deleteTrip = catchError(async (req, res, next) => {
  const deletedTripCount = await tripModel.destroy({
    where: { id: req.params.id },
  });

  if (deletedTripCount === 0) {
    return next(new apiError("Trip not found", 404));
  }

  res.json({ msg: "Trip deleted successfully" });
});

export { addTrip, getTrips, getTrip, updateTrip, deleteTrip };
