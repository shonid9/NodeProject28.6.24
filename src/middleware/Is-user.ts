
//is-user.ts

import { Request, Response, NextFunction, RequestHandler } from 'express';
import { User } from '../models/Users'; // Adjust the path as per your project structure
import { auth } from '../service/Auth-service';
import { BizCardsError } from '../error/Biz-cards-error';
import { IUser } from '../@types/User'; // Adjust the path as per your project structure
import { extractToken } from './Is-admin';

// Extend the Request interface to include a user property
declare global {
    namespace Express {
        interface Request {
            user?: IUser;
        }
    }
}

// Middleware function
const isUser: RequestHandler = async (req, res, next) => {
    try {
        const { id } = req.params;
        const token = extractToken(req);
        const { email } = auth.verifyJWT(token);

        // Get user from database
        const user = await User.findOne({ email }).lean() as IUser;

        // Assign user to req object
        req.user = user;

        if (!user) {
            throw new BizCardsError('User does not exist', 401);
        }

        if (id === (user?._id ?? '').toString()) {
            return next();
        }

        res.status(401).json({ message: 'The id must belong to the user' });
    } catch (e) {
        next(e);
    }
};

export { isUser };
