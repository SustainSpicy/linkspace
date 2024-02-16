import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import session from "express-session";
import { athenticateToken } from "./utils/jwt.js";
import authRoutes from "./routes/authRoutes.js";
import jwtRoutes from "./routes/jwtRoutes.js";
import profileRoutes from "./routes/profileRoute.js";
import connectToDb from "./mongodb/db.js";
const app = express();

dotenv.config();
const corsOptions = {
  origin: ["http://localhost:5173", "https://nxt-spacefe.onrender.com"], // Change this to your React app's origin
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/jwt", jwtRoutes);
app.use("/profile", athenticateToken, profileRoutes);

app.get("/", athenticateToken, (req, res) => {
  // console.log(req.user);
  res.status(200).json();
});

const PORT = process.env.PORT || 5000;

connectToDb((err) => {
  if (!err) {
    console.log("Database connected...");
    app.listen(PORT, () => console.log("Server started on " + PORT));
  } else {
    console.error("Error connecting to DB!!");
  }
});
