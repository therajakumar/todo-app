import mongoose from "mongoose";
const connection = () => {
  const url =
    "mongodb+srv://shubham:1234567890@cluster0.ppm7bwf.mongodb.net/registerV2?retryWrites=true&w=majority";

  mongoose.connect(url);
  mongoose.connection.on("connected", () => {
    console.log("connected with database sucessfully🚀🚀");
  });
  mongoose.connection.on("disconnected", () => {
    console.log("disconnected");
  });
  mongoose.connection.on("error", () => {
    console.log("error", error.message);
  });
};
export default connection;





// import mongoose from "mongoose";

// export default async function connectDB() {
//   await mongoose.connect(process.env.MONGODB_URI);
//   console.log("Connected to MongoDB");
// }
