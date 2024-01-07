import mongoose from "mongoose";

let dbConnection;
const connectToDb = (cb) => {
  mongoose
    .connect("mongodb+srv://admin:12345a@cluster0.kh2qhzz.mongodb.net/")
    .then((client) => {
      dbConnection = client;
      return cb();
    })
    .catch((err) => {
      console.error(err);
      return cb(err);
    });
};

export default connectToDb;

export const getDb = () => dbConnection;
