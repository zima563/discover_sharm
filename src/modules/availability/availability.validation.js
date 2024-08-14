// import joi from "joi";

// const availabilityVal = joi.object({
//   date: joi.date().required().iso().min(Date.now()).label("Date").messages({
//     "any.required": "Date is required",
//     "date.iso": "Must be a valid date in ISO format",
//   }),
//   maxCapacity: joi
//     .number()
//     .integer()
//     .positive()
//     .required()
//     .label("Max Capacity")
//     .messages({
//       "any.required": "Max capacity is required",
//       "number.base": "Max capacity must be a number",
//       "number.integer": "Max capacity must be an integer",
//       "number.positive": "Max capacity must be a positive number",
//     }),
//   booked: joi
//     .number()
//     .integer()
//     .min(0)
//     .optional()
//     .default(0)
//     .label("Booked")
//     .messages({
//       "any.required": "Booked field is required",
//       "number.base": "Booked must be a number",
//       "number.integer": "Booked must be an integer",
//       "number.min": "Booked cannot be less than 0",
//     }),
// });

// const checkAvailabilityVal = joi.object({
//   date: joi.date().required().iso().label("Date").messages({
//     "any.required": "Date is required",
//     "date.iso": "Must be a valid date in ISO format",
//   }),
//   numberOfAdults: joi.number().integer().positive().required(),
//   numberOfChild: joi.number().integer().positive().required(),
// });

// export { availabilityVal };
