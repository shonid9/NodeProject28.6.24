

import { Logger } from "../logs/Logger";
import { User } from "../models/Users";
import { users } from "../config/Users";
const initDB = async () => {
  


  const usersCount = await User.countDocuments();
  if (usersCount != 0) return;

  for (let user of users) {
    const saved = await new User(user).save();
    Logger.verbose("Added user: ", saved);
  }

  Logger.info("DB initialized");

};

export { initDB };
