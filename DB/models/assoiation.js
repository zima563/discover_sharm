import { tripModel } from "./trip.model.js";
import { reviewModel } from "./review.model.js";

// Define associations after importing all models
tripModel.hasMany(reviewModel, { foreignKey: "tripId", as: "myReviews" });
reviewModel.belongsTo(tripModel, { foreignKey: "tripId", as: "trip" });

export { tripModel, reviewModel };