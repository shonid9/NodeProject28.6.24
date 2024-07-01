



//what user controller does , it is responsible for getting the user by id for example





import express, { Request, Response, NextFunction, RequestHandler } from 'express';
import { User } from '../models/Users';
import { BizCardsError } from '../error/Biz-cards-error';
import { Logger } from '../logs/Logger';
import morgan from 'morgan';

const logger = new Logger();
const router = express.Router();

router.use(morgan("dev"));

const getUserById: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
   Logger.info(`user found`);

  try {
    const { id } = req.params;

    // Ensure isAdminOrUser middleware has already verified user permissions
    const user = await User.findById(id).lean();

    if (!user) {
      throw new BizCardsError('User not found', 404);
    }

    // Remove sensitive data like password from the response
    const { password, ...rest } = user;

    return res.json({ user: rest });
  } catch (e) {
    next(e);
  }
};

export { getUserById };
