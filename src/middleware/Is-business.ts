// import { RequestHandler } from "express";
// import { BizCardsError } from "../error/biz-cards-error";
// import { auth } from "../service/auth-service";
// import { User } from "../models/users";
// import { extractToken } from "./is-admin";
// import { IUser } from "../@types/user";

// const isBusiness: RequestHandler = async (req, res, next) => {
//     try {
//         const token = extractToken(req);
//         const { email } = auth.verifyJWT(token);

//         // Get user from database
//         let user = await User.findOne({ email });

//         if (!user) {
//             throw new BizCardsError("User does not exist", 401);
//         }

//         user = user; // Assign user to request

//         const isBusiness = user?.isBusiness;
//         if (isBusiness) {
//             return next();
//         }

//         throw new BizCardsError("User must be a business", 401);
//     } catch (e) {
//         next(e);
//     }
// };

// export { isBusiness };

// // src/middleware/is-business.ts
import { RequestHandler, Request } from "express";
import { BizCardsError } from "../error/Biz-cards-error";
import { auth } from "../service/Auth-service";
import { extractToken } from "./Is-admin";
import { User } from "../models/Users";
const isBusiness: RequestHandler = async (req, res, next) => {
  try {
    const token = extractToken(req);
    const { email } = auth.verifyJWT(token);


    //get user from database
    const user = await User.findOne({ email });

    if (!user) {
      throw new BizCardsError("User does not exist", 401);
    }
    req.user = user;
    const isBusiness = user?.isBusiness;
    if (isBusiness) {
      return next();
    }

    throw new BizCardsError("User Must be a business", 401);
  } catch (e) {
    next(e);
  }
};

export { isBusiness };