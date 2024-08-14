import joi from "joi";

const idVal = joi.object({
  id: joi.string().required(),
});

export {
    idVal
}