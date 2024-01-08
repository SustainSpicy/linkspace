import express from "express";
import verifySocialAuth from "../utils/googleAuth.js";
import { authenticateUser } from "../utils/jwt.js";
import { addUserToDb } from "../utils/dbUtils.js";
import USER from "../mongodb/schema.js";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();
const router = express.Router();

router.post("/google", async (req, res) => {
  const { credential } = req.body;

  try {
    const {
      isValidIss,
      isValidAud,
      isEmailVerified,
      isTokenNotExpired,
      payload,
    } = await verifySocialAuth(credential, process.env.CLIENT_ID);

    // Perform the checks
    if (!isValidIss || !isValidAud || !isEmailVerified || !isTokenNotExpired) {
      console.error("Token is not valid.");

      return res.sendStatus(401);
    }

    //check if user already exists
    const userExists = await USER.findOne({ email: payload.email });

    if (userExists) {
      //proceed to create session

      console.log("exists");
      const { _id, __v, ...userData } = userExists;

      const { accessToken, refreshToken } = authenticateUser(req, userData);

      return res.status(200).json({ accessToken, refreshToken });
    } else {
      //add user to document
      const newUser = await addUserToDb({
        email: payload.email,
        firstName: payload.given_name,
        lastName: payload.family_name,
        authProvider: "google",
      });
      console.log("User added: ", newUser);

      const { _id, __v, ...userData } = newUser;
      const { accessToken, refreshToken } = authenticateUser(req, userData);

      return res
        .status(201)
        .json({ msg: "User Authenticated!", accessToken, refreshToken });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/signup", async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  if (!email || !password || !firstName || !lastName) {
    console.error("Email and password is required!");

    return res.status(401).json({ msg: "Email and password is required!" });
  }

  try {
    //check if user already exists
    const userExists = await USER.findOne({ email });
    if (userExists) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }
    // Hash the password before storing it
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    //add user to document
    const newUser = await addUserToDb({
      email,
      firstName,
      lastName,
      password: hashPassword,
    });
    console.log("User added: ", newUser);

    const { _id, __v, ...userData } = newUser;
    const { accessToken, refreshToken } = authenticateUser(req, userData);

    return res.status(201).json({ accessToken, refreshToken });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal server error" });
  }
});
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    console.error("Email and password is required!");

    return res.status(401).json({ msg: "Email and password is required!" });
  }

  try {
    //check if user already exists
    const userExists = await USER.findOne({ email });
    if (!userExists) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    // Compare the entered password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, userExists.password);

    if (!passwordMatch) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    console.log(userExists);
    const { _id, __v, ...userData } = userExists;
    const { accessToken, refreshToken } = authenticateUser(req, userData);

    return res
      .status(200)
      .json({ msg: "User Authenticated!", accessToken, refreshToken });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal server error" });
  }
});
export default router;
