import { User } from "../models/user.models.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const handleRegister = async (req, res) => {
  // get {name , email  , password} from req.body.
  const { name, email, password } = req.body;
  // validations - not empty.
  if (!name || !email || !password)
    return res.status(400).send("All fields are required!");

  // check if user already exists.
  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).send("User already exists!");

    // bcrpyt password.
    const hashedPassword = await bcrypt.hash(password, 12);

    // save the new User into DB and return it.

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { _id: newUser._id },
      process.env.ACCESS_TOKEN_SECRET_KEY,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );

    const createdUser = await User.findById(newUser._id).select(
      "-password -accessToken"
    );

    if (!createdUser) {
      res.status(500).send("Something went wrong while registering the user");
    }

    return res.status(201).json({
      message: "User has been registered successfully",
      user: createdUser,
      token,
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const handleLogin = async (req, res) => {
  const { email, password } = req.body;
  // validate input data.
  if (!email || !password)
    return res.status(400).send("Please provide all required fields.");

  try {
    const newUser = await User.findOne({ email });

    if (!newUser) return res.status(400).send("User doesn't exist");
    const isValidPassword = await bcrypt.compare(password, newUser.password);
    if (!isValidPassword) return res.status(400).send("Invalid credentials");

    const token = jwt.sign(
      { _id: newUser._id },
      process.env.ACCESS_TOKEN_SECRET_KEY,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );

    const createdUser = await User.findById(newUser._id).select("-password");

    return res.status(201).json({
      message: "User has been logged in successfully",
      createdUser,
      token,
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const handleLogout = async () => {};
