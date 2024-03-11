import nodemailer from "nodemailer";
import Mailgen from "mailgen";
// import { configDotenv } from "dotenv";

// configDotenv.config()

let mailConfig = {
  host: process.env.EMAIL_HOST,
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
};
export const transporter = nodemailer.createTransport(mailConfig);

export let Mailgenerator = new Mailgen({
  theme: "default",
  product: { name: "Mailgen", link: "https://mailgen.js/" },
});
