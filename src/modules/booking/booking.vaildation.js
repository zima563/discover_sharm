import joi from "joi";

const createBookingVal = joi.object({
  id: joi.string().required(),
  date: joi.date().required().iso().label("Date").messages({
    "any.required": "Date is required",
    "date.iso": "Must be a valid date in ISO format",
  }),
  Adults: joi.number().min(0).required(),
  children: joi.number().min(0).required(),
  children_s: joi.number().min(0).required(),
});


const addContentVal = joi.object({
    name:joi.string().trim().min(2).max(100).required(),
    email: joi.string().pattern(/[A-Za-z0-9]{3,50}@(gmail|yahoo).com$/).required(),
    phone:joi.string().pattern(/^(00201|\+201|01)[0-2,5]{1}[0-9]{8}$/).required(),
    time:joi.string()
    .pattern(/^([01]\d|2[0-3]):?([0-5]\d)$/)
    .required()
    .messages({
      'string.pattern.base': 'Time must be in HH:MM format',
      'any.required': 'Time is required',
    }),
    hotel:joi.string().trim().min(2).max(100).required(),
    RoomNumber:joi.number().min(0).required().options({ convert: false }),
});

export{
    createBookingVal,
    addContentVal
}


