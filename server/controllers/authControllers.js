const User = require('../model/authModellogin');
const jwt = require("jsonwebtoken");

const maxAge = 3 * 24 * 60 * 60; // 3 days
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "kishan sheth super secret key", {
    expiresIn: maxAge,
  });
};

const handleErrors = (err) => {
  let errors = { email: "", password: "" };

  if (err.message === "incorrect email") {
    errors.email = "That email is not registered";
  }

  if (err.message === "incorrect password") {
    errors.password = "That password is incorrect";
  }

  if (err.code === 11000) {
    errors.email = "Email is already registered";
    return errors;
  }

  if (err.message.includes("Users validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

module.exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.create({ email, password });
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user: user._id, message: "User registered successfully" });
  } catch (err) {
    console.log(err); // Log the error for debugging
    const errors = handleErrors(err);
    res.status(400).json({ errors }); // Respond with a 400 status code for client errors
  }
};


module.exports.login = async (req, res) => {
  const { email, password } = req.body;

  // Check for missing fields
  if (!email || !password) {
    return res.status(400).json({ errors: { email: "Email is required", password: "Password is required" }, status: false });
  }

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);

    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id, message: "Login successful", status: true });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors, status: false });
  }
};
