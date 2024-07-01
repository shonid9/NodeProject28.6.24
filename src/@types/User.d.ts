

//src/@types/user.d.ts
import { ObjectId } from "mongoose";

type IName = {
  first: string;
  middle?: string;
  last: string;
};

type IAddress = {
  street: string;
  city: string;
  state?: string;
  zip?: string;
  country: string;
  houseNumber: number;
};

type IImage = {
  alt: string;
  url: string;
};

type IUser = {
  save(): unknown;
  name: IName;
  address: IAddress;
  image?: IImage;
  email: string;
  phone: string;
  password: string;
  isBusiness?: boolean;
  isAdmin?: boolean;
  createdAt?: Date;
  _id?: string;
  loginAttempts?: number;
  isLocked?: boolean;
  lockUntil?: Date;
};

type ILogin = {
  email: string;
  password: string;
};

type IJWTPayload = {
  email: string;
  _id: ObjectId;
  isAdmin?: boolean;
  isBusiness?: boolean;
};

export { IUser, IName, IAddress, IImage, ILogin, IJWTPayload };

export interface AuthRequest extends Request {
  user?: IUser | undefined;
}