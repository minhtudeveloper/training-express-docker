import { ENV as env } from "@/config";
import mongoose from "mongoose";

const mongoConfig = () => {

  return new Promise<any>((resolve, reject) => {
    // mongoose.set("useCreateIndex", true);
    mongoose.connect(env.MONGODB_URI, {
      autoIndex: true,
    });
    const db = mongoose.connection;
    db.on("error", () => reject("Please install and start your mongodb"));
    db.once("open", resolve);
  })
    .then(() => {
      console.log("connect mongo success");
    })
    .catch((err) => {
      console.log(
        `MongoDB connection error. Please make sure MongoDB is running. ${err}`,
      );
    });
}

export default mongoConfig