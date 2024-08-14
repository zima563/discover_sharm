import express from "express";
import { addReview, getReview, getReviews } from "./review.controller.js";
import { validation } from "../../middleware/validation.js";
import { addReviewVal } from "./review.validation.js";

const reviewRouter = express.Router();

reviewRouter.route("/add/:id").post(validation(addReviewVal), addReview);
reviewRouter.route("/all").get(getReviews);
reviewRouter.route("/:id").get(getReview)

export default reviewRouter;