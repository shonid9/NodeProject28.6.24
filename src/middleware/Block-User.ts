import { Request, Response, NextFunction } from 'express';
import { IUserModel } from '../schema/User'; // Adjust this import based on your user model
import { User } from '../models/Users';

const MAX_LOGIN_ATTEMPTS = 3;
const LOCK_TIME = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export const handleFailedLoginAttempts = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }) as IUserModel;

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check if the account is currently locked
    if (user.lockUntil && user.lockUntil > new Date()) {
      const remainingTime = user.lockUntil.getTime() - new Date().getTime();
      return res.status(403).json({ message: `Account locked. Try again in ${remainingTime / (1000 * 60)} minutes.` });
    }

    // Check password validity (your actual password check logic)
    const isValidPassword = await user.isValidPassword(password);

    if (!isValidPassword) {
      user.loginAttempts++;

      if (user.loginAttempts >= MAX_LOGIN_ATTEMPTS) {
        user.lockUntil = new Date(Date.now() + LOCK_TIME);
        await user.save();
        return res.status(403).json({ message: `Account locked. Try again in 24 hours.` });
      }

      await user.save();
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Reset failed login attempts on successful login
    user.loginAttempts = 0;
    user.lockUntil = undefined;
    await user.save();

    next();
  } catch (error) {
    console.error('Error handling login attempts:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
