// import { Schema } from "mongoose";
// import { IUser } from "../@types/User";
// import { nameSchema } from "../schema/Name-schema";
// import { imageSchema } from "../schema/Image-schema";
// import { addressSchema } from "../schema/Address-schema";

// const userSchema = new Schema<IUser>({
//   name: nameSchema,
//   address: addressSchema,
//   image: {
//     type: imageSchema,
//     required: false,
//     default: {
//       alt: "user-profile",
//       url: "https://picsum.photos/200/300",
//     },
//   },
//   phone: {
//     required: true,
//     type: String,
//     minlength: 9,
//     maxlength: 15,
//   },
//   email: {
//     unique: true,
//     required: true,
//     type: String,
//     minlength: 7,
//     maxlength: 20,
//   },
//   password: {
//     required: true,
//     type: String,
//     minlength: 7,
//     maxlength: 100,
//   },
//   isAdmin: {
//     type: Boolean,
//     required: false,
//     default: false,
//   },
//   isBusiness: {
//     type: Boolean,
//     required: false,
//   },
//   createdAt: {
//     type: Date,
//     required: false,
//     default: new Date(),
//   },
// });

// export { userSchema };
import { Schema } from "mongoose";
import { IUser } from "../@types/User";
import { nameSchema } from "../schema/Name-schema";
import { imageSchema } from "../schema/Image-schema";
import { addressSchema } from "../schema/Address-schema";

interface IUserModel extends IUser {
  isValidPassword(password: any): unknown;
  save(): unknown;
  loginAttempts: number;
  lockUntil: Date | undefined;
}

const userSchema = new Schema<IUserModel>({
  name: nameSchema,
  address: addressSchema,
  image: {
    type: imageSchema,
    required: false,
    default: {
      alt: "user-profile",
      url: "https://picsum.photos/200/300",
    },
  },
  phone: {
    required: true,
    type: String,
    minlength: 9,
    maxlength: 15,
  },
  email: {
    unique: true,
    required: true,
    type: String,
    minlength: 7,
    maxlength: 20,
  },
  password: {
    required: true,
    type: String,
    minlength: 7,
    maxlength: 100,
  },
  isAdmin: {
    type: Boolean,
    required: false,
    default: false,
  },
  isBusiness: {
    type: Boolean,
    required: false,
  },
  createdAt: {
    type: Date,
    required: false,
    default: new Date(),
  },
  loginAttempts: {
    type: Number,
    required: true,
    default: 0,
  },
  lockUntil: {
    type: Date,
    default: null,
  },
});

export { userSchema, IUserModel };
