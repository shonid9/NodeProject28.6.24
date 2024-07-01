import { joiCardSchema } from "../../JOI/Card.joi";
import { joiLoginSchema } from "../../JOI/Login.joi";
import { joiUserSchema } from "../../JOI/User.joi";
import { validateSchema } from "./Validate-schema";

export const validateRegistration = validateSchema(joiUserSchema);
export const validateLogin = validateSchema(joiLoginSchema);
export const validateCard = validateSchema(joiCardSchema);