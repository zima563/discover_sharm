import { reviewModel } from "../../../DB/models/assoiation.js";
import { tripModel } from "../../../DB/models/assoiation.js";
import { catchError } from "../../middleware/catchError.js";
import { apiError } from "../../utils/apiError.js";

const addReview = catchError(async (req, res, next) => {
  let trip = await tripModel.findByPk(req.params.id);
  !trip && next(new apiError("not trip found", 404));

  let review = new reviewModel(req.body);
  review.tripId = req.params.id;
  await review.save();

  let ratingQuantity = trip.ratingQuantity + 1;
  let ratingAverage = ((trip.ratingAverage * trip.ratingQuantity) + review.rate) / ratingQuantity;

  await tripModel.update(
    { ratingAverage, ratingQuantity },
    {
      where: { id: req.params.id },
    }
  );

  res.json({ msg: "success", review });
});

const getReviews = catchError(async (req, res) => {
  let reviews = await reviewModel.findAll();
  res.json({ msg: "success", reviews });
});

const getReview = catchError(async (req, res) => {
  let review = await reviewModel.findByPk(req.params.id);
  !review && next(new apiError("not review found"));
  review && res.json({ msg: "success", review });
});

export { addReview, getReview, getReviews };
