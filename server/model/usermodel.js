import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
const registerSchema = new mongoose.Schema({
  name: { type: String, require: true },
  email: { type: String, require: true },
  password: { type: String, require: true },
});
// registerSchema.method.matchPassword = async function (enteredPassword) {
//   return await bcryptjs.compare(enteredPassword, this.password);
// };
registerSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcryptjs.hash(this.password, 12);
  }
  next();
});
export const modeluser = mongoose.model("modeluser", registerSchema);
