// import { IUser } from "../@types/User";
// import { User } from "../models/Users";
// import { BizCardsError } from "../error/Biz-cards-error";
// import { auth } from "./Auth-service";


// const createUser = async (userData: IUser) => {
//   const user = new User(userData);
//   user.password = await auth.hashPassword(user.password);
//   return user.save();
// };

// const validateUser = async (email: string, password: string) => {
//   const user = await User.findOne({ email });

//   if (!user) {
//     throw new BizCardsError("Bad credentials", 401);
//   }

//   //check the password:
//   const isPasswordValid = await auth.validatePassword(password, user.password);

//   if (!isPasswordValid) {
//     throw new BizCardsError("Bad credentials", 401);
//   }

//   const jwt = auth.generateJWT({
//     email,
//     _id: user.id,
//     isAdmin: user.isAdmin,
//     isBusiness: user.isBusiness,
//   });

//   return { jwt };
// };

// export {createUser, validateUser}



















//with the lock account feature

import { IUser } from "../@types/User";
import { User } from "../models/Users";
import { BizCardsError } from "../error/Biz-cards-error";
import { auth } from "./Auth-service";

const MAX_LOGIN_ATTEMPTS = 3;
const LOCK_TIME = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

const createUser = async (userData: IUser) => {
  const user = new User(userData);
  user.password = await auth.hashPassword(user.password);
  return user.save();
};

const validateUser = async (email: string, password: string) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new BizCardsError("Bad credentials", 401);
  }

  // Check if the account is currently locked
  if (user.lockUntil && user.lockUntil.getTime() > Date.now()) {
    const remainingTime = (user.lockUntil.getTime() - Date.now()) / 1000;
    throw new BizCardsError(`Account locked. Please try again in ${remainingTime} seconds.`, 401);
  }

  // Check the password
  const isPasswordValid = await auth.validatePassword(password, user.password);

  if (!isPasswordValid) {
    // Update login attempts and lock the account if max attempts reached
    user.loginAttempts++;
    if (user.loginAttempts >= MAX_LOGIN_ATTEMPTS) {
      user.lockUntil = new Date(Date.now() + LOCK_TIME); // Lock the account for 24 hours
      await user.save();
      throw new BizCardsError(`Account locked. Please try again later.`, 401);
    } else {
      await user.save();
      throw new BizCardsError("Bad credentials", 401);
    }
  }

  // Reset login attempts if login successful
  user.loginAttempts = 0;
  user.lockUntil = undefined;
  await user.save();

  const jwt = auth.generateJWT({
    email,
    _id: user.id,
    isAdmin: user.isAdmin,
    isBusiness: user.isBusiness,
  });

  return { jwt };
};

export { createUser, validateUser };
