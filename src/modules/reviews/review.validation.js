import joi from "joi";

const addReviewVal = joi.object({
    id: joi.string().required(),
    
    name:joi.string().trim().min(2).max(100).required(),
    email: joi.string().pattern(/[A-Za-z0-9]{3,50}@(gmail|yahoo).com$/).required(),
    rate: joi.number().min(0).max(5).required().options({ convert: false }),
    rateText: joi.string().min(1).max(200).trim().required(),
});

export {
    addReviewVal
}