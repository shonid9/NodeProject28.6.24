// import { RequestHandler, Request } from "express";
// import { BizCardsError } from "../error/biz-cards-error";
// import { auth } from "../service/auth-service";
// import { User } from "../models/users";

// const extractToken = (req: Request) => {
//   const authHeader = req.header("Authorization"); //"bearer aslkfdjasfl2ejroi2ejwroi32jerf"

//   if (
//     authHeader &&
//     authHeader.length > 7 &&
//     authHeader.toLowerCase().startsWith("bearer ")
//   ) {
//     return authHeader.substring(7);
//   }
//   throw new BizCardsError("token is missing in Authorization header", 400);
// };

// const validateToken: RequestHandler = async (req, res, next) => {
//   try {
//     const token = extractToken(req);

//     const { email } = auth.verifyJWT(token);
//     let user = await User.findOne({ email });
//     if (!user) throw new BizCardsError("User does not exist", 401);
//     user = user;
//     next();
//   } catch (e) {
//     next(e);
//   }
// };

// export { validateToken };

















//src/middleware/validate-token.ts
import { RequestHandler, Request } from "express";
import { BizCardsError } from "../error/Biz-cards-error";
import { auth } from "../service/Auth-service";
import { User } from "../models/Users";

const extractToken = (req: Request) => {
  const authHeader = req.header("Authorization"); //"bearer aslkfdjasfl2ejroi2ejwroi32jerf"

  if (
    authHeader &&
    authHeader.length > 7 &&
    authHeader.toLowerCase().startsWith("bearer ")
  ) {
    return authHeader.substring(7);
  }
  throw new BizCardsError("token is missing in Authorization header", 400);
};

const validateToken: RequestHandler = async (req, res, next) => {
  try {
    const token = extractToken(req);

    const { email } = auth.verifyJWT(token);
    const user = await User.findOne({ email });
    if (!user) throw new BizCardsError("User does not exist", 401);
    req.user = user;
    next();
  } catch (e) {
    next(e);
  }
};

export { validateToken };