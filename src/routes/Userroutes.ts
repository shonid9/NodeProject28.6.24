
//userroutes.ts



import { Router } from "express";
import { ILogin, IUser } from "../@types/User";
import { User } from "../models/Users";
import { validateLogin, validateRegistration } from "../middleware/validation/ValidetionsJoi";
import { createUser, validateUser } from "../service/User-service";
import { isAdmin } from "../middleware/Is-admin";
import { isAdminOrUser } from "../middleware/Is-admin-or-user";
import { isUser } from "../middleware/Is-user";
import { auth } from "../service/Auth-service";
import morgan from "morgan";
import { Logger } from "../logs/Logger";
import { getUserById } from "../controller/UserController";
import { BizCardsError } from "../error/Biz-cards-error";


const router = Router();

// Create a new Logger instance
const logger = new Logger();

// Use Morgan for basic request logging
router.use(morgan("dev"));

// Get all users
router.get("/", isAdmin, async (_req, res, next) => {
  try {
    const allUsers = await User.find();

    // Log retrieval of all users
    Logger.info("All users retrieved");
    res.json(allUsers);
  } catch (e) {
    next(e);
  }
});

// Update user by ID
router.put("/:id", isUser, validateRegistration, async (req, res, _next) => {
  try {
    // Hash the password
    req.body.password = await auth.hashPassword(req.body.password);

    const savedUser = await User.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );

    // Log update of user
    Logger.info(`User with ID ${req.params.id} updated`);

    // Remove the password before sending response
    if (savedUser) {
      const { password, ...rest } = savedUser.toObject();
      res.json(rest);
    } else {
      throw new BizCardsError("User not found", 404);
    }
  } catch (e) {
    _next(e);
  }
});

// Get a user by ID
//a different way to write the same function
//used controller instead of writing the function in the route

router.get('/:id', isAdminOrUser, getUserById);


// Delete a user by ID
router.delete("/:id", isAdminOrUser, async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteUser = await User.findOneAndDelete({ _id: id });


    // Log deletion of user
    Logger.info(`User with ID ${id} deleted`);

    return res.json(deleteUser);
  } catch (e) {
    next(e);
  }
});

// Register a new user
router.post("/", validateRegistration, async (req, res, next) => {
  try {
    const saved = await createUser(req.body as IUser);

    // Log creation of a new user
    Logger.info(`New user registered with email ${saved.email}`);

    res.status(201).json({ message: "Saved", user: saved });
  } catch (err) {
    next(err);
  }
});

// Login user
router.post("/login", validateLogin, async (req, res, next) => {
  try {
    const { email, password } = req.body as ILogin;
    const jwt = await validateUser(email, password);

    // Log successful login
    Logger.info(`User ${email} logged in`);

    res.json(jwt);
  } catch (e) {
    next(e);
  }
});

// Patch user business status by ID
router.patch("/:id", isAdminOrUser, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { businessStatus } = req.body;

    if (typeof businessStatus !== "boolean") {
      return res.status(400).json({ message: "Invalid businessStatus value" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { isBusiness: businessStatus },
      { new: true }
    ).lean();

    // Log update of user's business status
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    Logger.info(`Business status updated for user with ID ${id}`);

    const { password, ...rest } = updatedUser;
    res.json({ user: rest });
  } catch (e) {
    next(e);
  }
});




export { router as usersRouter };




































































// import { Router } from "express";
// import { ILogin, IUser } from "../@types/user";
// import { User } from "../models/users";
// import { validateLogin, validateRegistration } from "../middleware/validation/validetionsJoi";
// import { createUser, validateUser } from "../service/user-service";
// import { isAdmin } from "../middleware/is-admin";
// import { isAdminOrUser } from "../middleware/is-admin-or-user";
// import { isUser } from "../middleware/is-user";
// import { auth } from "../service/auth-service";
// import { Logger } from "../logs/logger";
// const router = Router();


// //get all users

// //you get a token from the request
// //you verify the token
// //you get all users from the database

// router.get("/", isAdmin, async (req, res, next) => {
//   try {
//     const allUsers = await User.find();

//     res.json(allUsers);
//   } catch (e) {
//     next(e);
//   }
// });


// //update user

// //get the user from the database
// //update the user
// //save the user

// // router.put("/:id", isUser, validateRegistration, async (req, res, next) => {
// //   //hash the password:
// //   req.body.password = await auth.hashPassword(req.body.password);

// //   const savedUser = await User.findByIdAndUpdate(
// //     { _id: req.params.id },
// //     req.body,
// //     { new: true }
// //   );
// //   //not null check
// //   //remove the password
// //   res.json(savedUser);
// // });



// //update a user by id
// //registered user and admin can update user details , admin can update any user details

// router.put("/:id", isAdminOrUser, validateRegistration, async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const updatedUser
//       = await User.findByIdAndUpdate
//         (id
//           , req.body
//           , { new: true });
//     if (!updatedUser) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     const { password, ...rest } = updatedUser;
//     res.json({ user: rest });
//   } catch (e) {
//     next(e);
//   }
// }
// );






// //get user by id
// router.get("/:id", isAdminOrUser, async (req, res, next) => {
//   try {
//     const { id } = req.params;

//     const user = (await User.findById(id).lean()) as IUser;

//     const { password, ...rest } = user;
//     return res.json({ user: rest });
//   } catch (e) {
//     next(e);
//   }
// });




// //delete user
// router.delete("/:id", isAdminOrUser, async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const deleteUser = await User.findOneAndDelete({ _id: id });
//     Logger.verbose("deleted the user");
//     return res.json(deleteUser);
//   } catch (e) {
//     next(e);
//   }
// });







// //register
// router.post("/", validateRegistration, async (req, res, next) => {
//   try {
//     const saved = await createUser(req.body as IUser);
//     res.status(201).json({ message: "Saved", user: saved });
//   } catch (err) {
//     next(err);
//   }
// });





// //login
// //after login -> JWT
// //JWT -> email, id
// //JWT -> verify

// router.post("/login", validateLogin, async (req, res, next) => {
//   try {
//     //check the request:
//     const { email, password } = req.body as ILogin;
//     try {
//       //call the service:
//       const jwt = await validateUser(email, password);

//       const successMessage = "Login successful";
//       //response
//       res.json(jwt);
//         res.send(successMessage);
      
//     } catch (e) {
//       //email / password are invalid
//       //save data to database: Date ['', '', '']
//       //res.json /or throw
//     }

   
//   } catch (e) {
//     next(e);
//   }
// });

// export { router as usersRouter };





// //bonus
// //allow admin to change business number
// //isAdmin

// router.patch("/business/:id", isAdmin, async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const { businessNumber } = req.body;

//     if (typeof businessNumber !== 'string') {
//       return res.status(400).json({ message: "Invalid businessNumber value" });
//     }

//     const updatedUser = await User.findByIdAndUpdate(
//       id,
//       { businessNumber },
//       { new: true }
//     ).lean() as IUser;

//     if (!updatedUser) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const { password, ...rest } = updatedUser;
//     res.json({ user: rest });
//   } catch (e) {
//     next(e);
//   }
// });




// //patch user business status by ID
// //isAdminOrUser

// router.patch("/:id", isAdminOrUser, async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const { businessStatus } = req.body;


//     if (typeof businessStatus !== 'boolean') {
//       return res.status(400).json({ message: "Invalid businessStatus value" });
    
//     }

//     const updatedUser = await User.findByIdAndUpdate(
//       id,
//       { isBusiness: businessStatus },
//       { new: true }
//     ).lean() as IUser;

//     if (!updatedUser) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const { password, ...rest } = updatedUser;
//     res.json({ user: rest });
//   } catch (e) {
//     next(e);
//   }
// });









// import { Router } from "express";
// import { ILogin, IUser } from "../@types/user";
// import { User } from "../models/users";
// import { validateLogin, validateRegistration } from "../middleware/validation/validetionsJoi";
// import { createUser, validateUser } from "../service/user-service";
// import { isAdmin } from "../middleware/is-admin";
// import { isAdminOrUser } from "../middleware/is-admin-or-user";
// import { isUser } from "../middleware/is-user";
// import { auth } from "../service/auth-service";
// import { Logger } from "../logs/logger";
// import {getUserById} from "../controller/userController";
// const router = Router();

// //get all users
// router.get("/", isAdmin, async (_req, res, next) => {
//   try {
    
//     const allUsers = await User.find();

//     res.json(allUsers);
//   } catch (e) {
//     next(e);
//   }
// });


// //update user
// router.put("/:id", isUser, validateRegistration, async (req, res, _next) => {
//   //hash the password:
//   req.body.password = await auth.hashPassword(req.body.password);

//   const savedUser = await User.findByIdAndUpdate(
//     { _id: req.params.id },
//     req.body,
//     { new: true }
//   );
//   //not null check
//   //remove the password
//   res.json(savedUser);
// });

// //get a user by id
// router.get('/:id', isAdminOrUser, getUserById);

// //delete a user
// router.delete("/:id", isAdminOrUser, async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const deleteUser = await User.findOneAndDelete({ _id: id });
//     Logger.verbose("deleted the user");
//     return res.json(deleteUser);
//   } catch (e) {
//     next(e);
//   }
// });

// //email, password + userdetails
// //password -> hsah
// //register
// router.post("/", validateRegistration, async (req, res, next) => {
//   try {
//     const saved = await createUser(req.body as IUser);
//     res.status(201).json({ message: "Saved", user: saved });
//   } catch (err) {
//     next(err);
//   }
// });

// //email, password
// //JWT
// //login
// router.post("/login", validateLogin, async (req, res, next) => {
//   try {
//     //check the request:
//     const { email, password } = req.body as ILogin;
//     try {
//       //call the service:
//       const jwt = await validateUser(email, password);
//       //response
//       res.json(jwt);
//     } catch (e) {
//       //email / password are invalid
//       //save data to database: Date ['', '', '']
//       //res.json /or throw
//     }

   
//   } catch (e) {
//     next(e);
//   }
// });


// //patch user business status by ID

// router.patch("/:id", isAdminOrUser, async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const { businessStatus } = req.body;

//     if (typeof businessStatus !== "boolean") {
//       return res.status(400).json({ message: "Invalid businessStatus value" });
//     }

//     const updatedUser = await User.findByIdAndUpdate(
//       id,
//       { isBusiness: businessStatus },
//       { new: true }
//     ).lean();

//     if (!updatedUser) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const { password, ...rest } = updatedUser;
//     res.json({ user: rest });
//   } catch (e) {
//     next(e);
//   }
// });

// export { router as usersRouter };















// import { Router } from "express";
// import { ILogin, IUser } from "../@types/User";
// import { User } from "../models/Users";
// import { validateLogin, validateRegistration } from "../middleware/validation/ValidetionsJoi";
// import { createUser, validateUser } from "../service/User-service";
// import { isAdmin } from "../middleware/Is-admin";
// import { isAdminOrUser } from "../middleware/Is-admin-or-user";
// import { isUser } from "../middleware/Is-user";
// import { auth } from "../service/Auth-service";
// import morgan, { token } from "morgan";
// import { Logger } from "../logs/Logger";
// import { getUserById } from "../controller/UserController";
// import { BizCardsError } from "../error/Biz-cards-error";
// import { IUserModel } from "../schema/User";

// const router = Router();

// // Create a new Logger instance
// const logger = new Logger();

// // Use Morgan for basic request logging
// router.use(morgan("dev"));

// // Get all users
// router.get("/", isAdmin, async (_req, res, next) => {
//   try {
//     const allUsers = await User.find();

//     // Log retrieval of all users
//     Logger.info("All users retrieved");
//     res.json(allUsers);
//   } catch (e) {
//     next(e);
//   }
// });

// // Update user by ID
// router.put("/:id", isUser, validateRegistration, async (req, res, _next) => {
//   try {
//     // Hash the password
//     req.body.password = await auth.hashPassword(req.body.password);

//     const savedUser = await User.findByIdAndUpdate(
//       { _id: req.params.id },
//       req.body,
//       { new: true }
//     );

//     // Log update of user
//     Logger.info(`User with ID ${req.params.id} updated`);

//     // Remove the password before sending response
//     if (savedUser) {
//       const { password, ...rest } = savedUser.toObject();
//       res.json(rest);
//     } else {
//       throw new BizCardsError("User not found", 404);
//     }
//   } catch (e) {
//     _next(e);
//   }
// });

// // Get a user by ID
// router.get('/:id', isAdminOrUser, getUserById);

// // Delete a user by ID
// router.delete("/:id", isAdminOrUser, async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const deleteUser = await User.findOneAndDelete({ _id: id });

//     // Log deletion of user
//     Logger.info(`User with ID ${id} deleted`);

//     return res.json(deleteUser);
//   } catch (e) {
//     next(e);
//   }
// });

// // Register a new user
// router.post("/", validateRegistration, async (req, res, next) => {
//   try {
//     const saved = await createUser(req.body as IUser);

//     // Log creation of a new user
//     Logger.info(`New user registered with email ${saved.email}`);

//     res.status(201).json({ message: "Saved", user: saved });
//   } catch (err) {
//     next(err);
//   }
// });


// // Login user
// router.post("/login", validateLogin, async (req, res, next) => {
//   try {
//     const { email, password } = req.body as IUserModel; // Assuming IUser defines the structure of your login request
//     const user = await validateUser(email, password); // Validate user credentials (replace with your authentication logic)
//     const jwt = await validateUser(email, password);
//     // Check if the user exists and is valid
//     if (!user) {
//       // Log failed login attempt
//       Logger.warn(`Failed login attempt for user ${email}`);

//       // Handle failed login attempts
//       await handleFailedLoginAttempts(email); // This function will handle the failed attempts logic

//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     // Log successful login
//     Logger.info(`User ${email} logged in`);

//     // Assuming validateUser returns a JWT token or similar authentication result
//     res.json({ message: "Login successful", token: jwt });
//   } catch (error) {
//     next(error);
//   }
// });


// // Function to handle failed login attempts and block user if necessary
// async function handleFailedLoginAttempts(email: string) {
//   try {
//     const user = await User.findOne({ email }) as IUserModel | null; // Replace with your actual user model

//     if (!user) {
//       throw new Error("User not found");
//     }

//     // Increment login attempts if user exists
//     if (user.loginAttempts !== undefined) {
//       user.loginAttempts += 1;

//       // Check if user should be locked
//       if (user.loginAttempts >= 3) {
//         // Set lockout time (e.g., 24 hours from now)
//         user.lockUntil = new Date(Date.now() + 24 * 60 * 60 * 1000); // Lock user for 24 hours

//         // Log user block
//         Logger.warn(`User ${email} blocked due to multiple failed login attempts`);

//         // Save user to database
//         await user.save();
//       } else {
//         // Save user with updated login attempts
//         await user.save();
//       }
//     }
//   } catch (error) {
//     // Handle errors (log or throw as necessary)
//     Logger.error(`Error handling login attempts for user ${email}: ${console.error(error)}`);
//     throw error;
//   }
// }


// // Patch user business status by ID
// router.patch("/:id", isAdminOrUser, async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const { businessStatus } = req.body;

//     if (typeof businessStatus !== "boolean") {
//       return res.status(400).json({ message: "Invalid businessStatus value" });
//     }

//     const updatedUser = await User.findByIdAndUpdate(
//       id,
//       { isBusiness: businessStatus },
//       { new: true }
//     ).lean();

//     // Log update of user's business status
//     if (!updatedUser) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     Logger.info(`Business status updated for User with ID ${id}`);

//     const { password, ...rest } = updatedUser;
//     res.json({ user: rest });
//   } catch (e) {
//     next(e);
//   }
// });

// //allow admin to change bizNumber in condition it is not in use by another user

// router.patch("/business/:id", isAdmin, async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const { businessNumber } = req.body;

//     if (typeof businessNumber !== 'string') {
//       return res.status(400).json({ message: "Invalid businessNumber value" });
//     }

//     const updatedUser = await User.findByIdAndUpdate(
//       id,
//       { businessNumber },
//       { new: true }
//     ).lean() as IUser;

//     if (!updatedUser) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const { password, ...rest } = updatedUser;
//     res.json({ user: rest });
//   } catch (e) {
//     next(e);
//   }
// }); 


// export { router as usersRouter };
