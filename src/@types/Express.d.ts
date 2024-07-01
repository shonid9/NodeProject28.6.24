

// // @types/express.d.ts

// import { Request } from "express";
// // add user to express request
// declare module "express" {
//   export interface Request {
//     user: any;
//   }
// }


// import { IUser } from "./user";

// declare global {
//   namespace Express {
//     interface Request {
//       user?: IUser;
//     }
//   }
// }


// import { User } from "../models/users"; // Adjust the path as per your project structure
// import { IUser } from "./user"; // Adjust the path as per your project structure
// declare module 'express-serve-static-core' {
//     interface Request {
//         user?: User; // Define the user property on the Request object
//         isAdmin?: boolean;
//         isBusiness?: boolean;
//         _id?: string;
//     }
// }
// // src/@types/express.d.ts

// import { IUser } from "../@types/user"; // Adjust the path as per your project structure

// declare global {
//     namespace Express {
//         interface Request {
//             user?: IUser;
//             isAdmin?: boolean;
//             isBusiness?: boolean;
//             _id?: string;   // Add the _id property to the Request object

//         }
//     }
// }


import { Request } from "express";
// add user to express request
import { IUser } from "../@types/User";

declare global {
  namespace Express {
    interface Request {
      user?: {
        _id?: string;
        // Add other user properties if needed
      };
    }
  }
}


// src/@types/express.d.ts
