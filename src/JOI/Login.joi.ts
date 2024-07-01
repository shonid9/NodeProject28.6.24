import Joi from "joi";
import { passwordRegex } from "./Patterns";
import { ILogin } from "../@types/User";

const schema = Joi.object<ILogin>({
  email: Joi.string().email().required(),
  password: Joi.string().pattern(passwordRegex).required(),
});

export { schema as joiLoginSchema };