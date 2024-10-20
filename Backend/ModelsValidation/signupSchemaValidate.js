import Joi from "joi";

export const signupValidation = (req, res, next) => {
  const schema = Joi.object({
    fullName: Joi.string().min(3).max(100).required().messages({
      "string.empty": "Full Name cannot be empty",
      "string.min": "Full Name must be at least 3 characters",
      "any.required": "Full Name is required",
    }),
    username: Joi.string().min(3).max(100).required().messages({
      "string.empty": "Username cannot be empty",
      "string.min": "Username must be at least 3 characters",
      "any.required": "Username is required",
    }),
    email: Joi.string().email().required().messages({
      "string.email": "Please provide a valid email address",
      "any.required": "Email is required",
    }),
    password: Joi.string().min(6).max(100).required().messages({
      "string.empty": "Password cannot be empty",
      "string.min": "Password must be at least 6 characters",
      "any.required": "Password is required",
    }),
  });

  const { error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    const errorMessages = error.details.map((detail) => detail.message);
    return res
      .status(400)
      .json({ message: "Error in schemaValidation", errors: errorMessages });
  }

  next();
};

export const signInValidation = (req, res, next) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(100).optional().messages({
      "string.empty": "Username cannot be empty",
      "string.min": "Username must be at least 3 characters",
    }),
    email: Joi.string().email().optional().messages({
      "string.email": "Please provide a valid email address",
    }),
    password: Joi.string().min(6).max(100).required().messages({
      "string.empty": "Password cannot be empty",
      "string.min": "Password must be at least 6 characters",
      "any.required": "Password is required",
    }),
  }).xor("username", "email"); // Ensure either email or username is provided

  const { error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    const errorMessages = error.details.map((detail) => detail.message);
    return res
      .status(400)
      .json({ message: "Error in signInValidation", errors: errorMessages });
  }

  next();
};
