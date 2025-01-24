import Joi from "joi";

export const signupValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(100).required().messages({
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
    userType: Joi.string().valid("employee", "recruiter").required(),

    // Recruiter-specific fields
    position: Joi.string().when("userType", {
      is: "recruiter",
      then: Joi.string().min(3).max(100).required().messages({
        "string.empty": "Position is required for recruiters",
        "any.required": "Position is required for recruiters",
      }),
      otherwise: Joi.optional(),
    }),
    department: Joi.string().when("userType", {
      is: "recruiter",
      then: Joi.string().min(3).max(100).required().messages({
        "string.empty": "Department is required for recruiters",
        "any.required": "Department is required for recruiters",
      }),
      otherwise: Joi.optional(),
    }),
    companyName: Joi.string().when("userType", {
      is: "recruiter",
      then: Joi.string().min(3).max(100).required().messages({
        "string.empty": "Company Name is required for recruiters",
        "any.required": "Company Name is required for recruiters",
      }),
      otherwise: Joi.optional(),
    }),
    companyAddress: Joi.string().when("userType", {
      is: "recruiter",
      then: Joi.string().min(3).max(100).required().messages({
        "string.empty": "Company Address is required for recruiters",
        "any.required": "Company Address is required for recruiters",
      }),
      otherwise: Joi.optional(),
    }),
    contactNumber: Joi.string().when("userType", {
      is: "recruiter",
      then: Joi.string().min(10).max(15).required().messages({
        "string.empty": "Contact Number is required for recruiters",
        "any.required": "Contact Number is required for recruiters",
      }),
      otherwise: Joi.optional(),
    }),
  });

  const { error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    const errorDetails = error.details.reduce((acc, detail) => {
      const field = detail.path[0]; // Field name
      if (!acc[field]) acc[field] = [];
      acc[field].push(detail.message);
      return acc;
    }, {});

    return res.status(400).json({
      message: "Validation error",
      errors: errorDetails, // Structured field-specific error messages
    });
  }

  next();
};
