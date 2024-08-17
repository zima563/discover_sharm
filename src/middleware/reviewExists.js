import { reviewModel } from "../../DB/models/assoiation.js";
import { apiError } from "../utils/apiError.js";
import { catchError } from "./catchError.js";


export const reviewExists = catchError(async(req,res,next)=>{
    let review = await reviewModel.findOne({where: {email: req.body.email }});
    if(review) next(new apiError("your review already exist"));
    next();
}) 