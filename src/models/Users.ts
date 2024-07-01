import mongoose from "mongoose";
import { userSchema } from "../schema/User";

const User = mongoose.model("users", userSchema);

export { User };
