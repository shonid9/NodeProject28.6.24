import mongoose from "mongoose";
import { cardSchema } from "../schema/Card";

const Card = mongoose.model("Card", cardSchema);

export { Card };
