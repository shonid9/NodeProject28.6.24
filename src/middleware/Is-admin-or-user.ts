// import { RequestHandler, Request } from "express";
// import { auth } from "../service/auth-service";
// import { User } from "../models/users";
// import { extractToken } from "./is-admin";
// import { BizCardsError } from "../error/biz-cards-error";

// const isAdminOrUser: RequestHandler = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const token = extractToken(req);
//     const { email } = auth.verifyJWT(token);

//     //get user from database:
//     const user = await User.findOne({ email });
// if (user) {
//   req.user = user;
// }

//     if (!user) throw new BizCardsError("User does not exist", 401);

//     if (id == user.id) return next();

//     if (user.isAdmin) return next();

//     res
//       .status(401)
//       .json({ message: "Only admin/The id must belong to the user" });
//   } catch (e) {
//     next(e);
//   }
// };

// export { isAdminOrUser };













import { RequestHandler } from 'express';
import { auth } from '../service/Auth-service';
import { User } from '../models/Users'; 
import { BizCardsError } from '../error/Biz-cards-error';
import { extractToken } from './Is-admin';

const isAdminOrUser: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const token = extractToken(req);
    const { email } = auth.verifyJWT(token);

    // Find user by email (assuming email is unique)
    const user = await User.findOne({ email });

    if (!user) {
      throw new BizCardsError('User does not exist', 401);
    }

    if (id == user._id.toString() || user.isAdmin) {
      return next();
    } else {
      throw new BizCardsError('Unauthorized access', 401);
    }
  } catch (e) {
    next(e);
  }
};

export { isAdminOrUser };
