import mongoose from "mongoose";
import verifySocialAuth from "../utils/googleAuth.js";
import { authenticateUser } from "../utils/jwt.js";
import bcrypt from "bcrypt";
import USER from "../mongodb/userSchema.js";
import PROFILE from "../mongodb/profileSchema.js";
import crypto from "crypto";
import { Mailgenerator, transporter } from "../utils/email.js";

export const googleAuth = async (req, res) => {
  const { credential } = req.body;
  const session = await mongoose.startSession();

  try {
    await session.withTransaction(async () => {
      const {
        isValidIss,
        isValidAud,
        isEmailVerified,
        isTokenNotExpired,
        payload,
      } = await verifySocialAuth(credential, process.env.CLIENT_ID);

      // Perform the checks
      if (
        !isValidIss ||
        !isValidAud ||
        !isEmailVerified ||
        !isTokenNotExpired
      ) {
        console.error("Token is not valid.");

        return res.sendStatus(401);
      }

      //check if user already exists
      const userExists = await USER.userExist(payload.email);

      if (userExists) {
        //proceed to create session

        const { _id, __v, exp, authProvider, createdAt, ...userData } =
          userExists.toObject();

        const { accessToken, refreshToken } = authenticateUser(userData);
        console.log("exists");

        return res.status(200).json({
          msg: "User Authenticated!",
          accessToken,
          refreshToken,
          ...userData,
        });
      } else {
        //add user to document
        const newUser = await USER.createUser({
          email: payload.email,
          firstName: payload.given_name,
          lastName: payload.family_name,
          authProvider: "google",
        });
        newUser.save({ session });
        const profile = await PROFILE.createProfile({
          email: newUser.email,
          fullName: `${newUser.firstName} ${newUser.lastName}`,
        });

        console.log("User added: ", newUser);
        console.log("Profile added: ", profile);
        const { _id, __v, exp, authProvider, createdAt, ...userData } =
          newUser.toObject();
        const { accessToken, refreshToken } = authenticateUser(userData);

        return res.status(201).json({
          msg: "User Created!",
          ...userData,
          accessToken,
          refreshToken,
        });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    session.endSession();
  }
};

export const signup = async (req, res) => {
  const {
    email: inputEmail,
    password: inputPassword,
    firstName,
    lastName,
  } = req.body;

  if (!inputEmail || !inputPassword || !firstName || !lastName) {
    console.error("Email and password is required!");
    return res.status(401).json({ msg: "Email and password is required!" });
  }
  const session = await mongoose.startSession();

  try {
    //check if user already exists
    const userExists = await USER.userExist(inputEmail);
    if (userExists) {
      return res.status(400).json({ msg: "User already exist" });
    }
    await session.withTransaction(async () => {
      // Hash the password before storing it
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(inputPassword, salt);

      //add user to document
      const newUser = await USER.createUser({
        email: inputEmail,
        firstName,
        lastName,
        password: hashPassword,
      });

      newUser.save({ session });
      const profile = await PROFILE.createProfile({
        email: newUser.email,
        fullName: `${newUser.firstName} ${newUser.lastName}`,
      });

      console.log("User added: ", newUser);
      console.log("Profile added: ", profile);

      return res.status(201).json({ msg: "User Created!" });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal server error" });
  } finally {
    session.endSession();
  }
};

export const signin = async (req, res) => {
  const { email: inputEmail, password: inputPassword } = req.body;

  if (!inputEmail || !inputPassword) {
    console.error("Email and password is required!");

    return res.status(401).json({ msg: "Email and password is required!" });
  }

  try {
    //check if user already exists
    const userExists = await USER.userExist(inputEmail);
    if (!userExists || !userExists.password) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    // Compare the entered password with the stored hashed password
    const passwordMatch = await bcrypt.compare(
      inputPassword,
      userExists.password
    );

    if (!passwordMatch) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    const { _id, __v, password, ...userData } = userExists.toObject();

    const { accessToken, refreshToken } = authenticateUser(userData);

    return res.status(200).json({
      msg: "User Authenticated!",
      ...userData,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

export const requestEmailVerification = async (req, res) => {
  const { email } = req.user;
  const token = crypto.randomBytes(32).toString("hex");
  const expirationDate = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours from now

  // Save the token in the user document
  try {
    const user = await USER.findOneAndUpdate(
      { email: email },
      {
        $set: {
          "emailVerification.token": token,
          "emailVerification.expiresAt": expirationDate,
        },
      },
      { new: true }
    );
    if (!user) {
      return res.status(404).send("User not found.");
    }
    console.log(user);
    let emailTemplate = {
      body: {
        name: email,
        intro: `Thanks for signing up `,
        action: {
          instructions:
            "Hello there, Click the button below to verify your email:",
          button: {
            color: "#22BC66", // Optional action button color
            text: "Confirm your Email",
            link: `${process.env.CLIENT_URL}/verify?token=${token}`,
            target: "_blank",
          },
        },
        outro:
          "Need help, or have questions? Just reply to this email, we'd love to help.",
      },
    };
    let emailBody = Mailgenerator.generate(emailTemplate);

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Confirm your email address",
      html: emailBody,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.status(500).send("Error sending verification email.");
      } else {
        console.log("Email sent: " + info.response);
        res.send("Verification email sent.");
      }
    });

    // }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error saving verification token.");
  }
};

export const verifyEmail = async (req, res) => {
  const { email } = req.user;
  const token = req.params.token;

  try {
    const user = await USER.findOne({
      email,
      "emailVerification.token": token,
      "emailVerification.expiresAt": { $gt: new Date() },
    });
    console.log(user);
    if (!user) {
      return res.status(404).send("Invalid or expired token.");
    }

    // Mark the email as verified
    user.emailVerification.verified = true;
    await user.save();

    // Redirect the user to a success page or send a success message
    res.status(200).send("Email verified successfully.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error verifying email.");
  }
};
