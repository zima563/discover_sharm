import joi from "joi";

const addTripval = joi.object({
  price: joi.number().required().min(0),
  priceAfterDis: joi.number().required().min(0).max(joi.ref("price")),
});

const updateTripval = joi.object({
  id: joi.string().required(),

  price: joi.number().min(0).optional(),
  priceAfterDis: joi.number().min(0).max(joi.ref("price")).optional(),
});
export { addTripval, updateTripval };
