import Joi from "joi";

const createClient = Joi.object().keys({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().message("Please enter valid email"),
  id: Joi.string()
    .required()
    .max(13)
    .pattern(
      /(([0-9]{2})(0|1)([0-9])([0-3])([0-9]))([ ]?)(([0-9]{4})([ ]?)([0-1][8]([ ]?)[0-9]))/
    )
    .message("Please enter a valid ID"),
  address: Joi.string(),
});

export default { createClient };
