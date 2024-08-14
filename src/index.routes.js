import { globalError } from "./middleware/globalError.js";
import availRouter from "./modules/availability/avaliability.routes.js"
import bookingRouter from "./modules/booking/booking.routes.js";
import reviewRouter from "./modules/reviews/review.routes.js";
import tripRouter from "./modules/trip/trip.routes.js";
import { apiError } from "./utils/apiError.js";
import { createOnlineOrder } from "./modules/booking/booking.controller.js";


export const bootstrap = (app)=>{

    app.get(
        "/webhook",
        createOnlineOrder
      );
    app.use("/api/availability",availRouter);
    app.use("/api/trip",tripRouter);
    app.use("/api/booking",bookingRouter);
    app.use("/api/reviews",reviewRouter);

    app.get("/", (req, res) => res.send("Hello World!"));
    app.use("*", (req, res, next) => {
        next(new apiError(`not found endPoint : ${req.originalUrl}`, 404));
      });
    
      app.use(globalError);

}