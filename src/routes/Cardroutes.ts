

//cardroutes.ts

// import { Router, Request, Response, NextFunction } from "express";
// import { isBusiness } from "../middleware/is-business";
// import { validateCard } from "../middleware/validation/validetionsJoi";
// import { createCard } from "../service/card-service";
// import { ICardInput } from "../@types/card";
// import { BizCardsError } from "../error/biz-cards-error";
// import { Card } from "../models/cards";
// import { validateToken } from "../middleware/validate-token";

// import { IUser } from "../@types/user"; // Import the IUser type

// interface AuthenticatedRequest extends Request {
//   user?: IUser; // Update the user property type to IUser
//    _id: string;
//     isBusiness: boolean;
// }


// const router = Router();

// // Route to create a new card
// router.post("/", isBusiness, validateCard, async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
//   try {
//     const userId = req.user?._id;


//     if (!userId) {
//       throw new BizCardsError("User must have an id", 500);

//     }


//     const savedCard = await createCard(req.body as ICardInput, userId);

//     res.json({ card: savedCard });
//   } catch (e) {
//     next(e);
//   }
// });

// // Route to get all cards
// router.get("/", async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const cards = await Card.find();
//     return res.json(cards);
//   } catch (e) {
//     next(e);
//   }
// });

// // Route to get cards belonging to the authenticated user
// router.get("/my-cards", validateToken, async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const userId = (req as AuthenticatedRequest).user?._id!; // Use ! to assert that req.user is defined

//     const cards = await Card.find({ userId });

//     return res.json(cards);
//   } catch (e) {
//     next(e);
//   }
// });

// // Route to get a specific card by ID
// router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const { id } = req.params;

//     const card = await Card.findById(id);

//     return res.json(card);
//   } catch (e) {
//     next(e);
//   }
// });

// export { router as cardsRouter };












































// // cardRoutes.ts
// import e, { Router } from "express";
// import { isBusiness } from "../middleware/is-business";
// import { validateCard } from "../middleware/validation/validetionsJoi";
// import { createCard } from "../service/card-service";
// import { ICardInput } from "../@types/card";
// import { BizCardsError } from "../error/biz-cards-error";
// import { Card } from "../models/cards";
// import { validateToken } from "../middleware/validate-token";
// import {Logger} from "../logs/logger";


// const router = Router();

// // Create a new card
// router.post("/", validateToken, isBusiness, validateCard, async (req, res, next)   => {

//   try {

//  const userId = req.user?._id!;

//     if (!userId) {
//       throw new BizCardsError("User must have an id", 500);
//     }
//     const savedCard = await createCard(req.body as ICardInput, userId);

//     res.json({ card: savedCard });
//   } catch (e) {
//     next(e);
//   }
// });

// // Get all cards
// router.get("/", async (_req, res, next) => {
//   try {
//     const cards = await Card.find();
//     return res.json(cards);
//   } catch (e) {
//     next(e);
//   }
// });

// // Get cards belonging to the authenticated user
// router.get("/my-cards", validateToken, async (req, res, next) => {
//   try {
//     const userId = req.user?._id!;

//     const cards = await Card.find({ userId });

//     return res.json(cards);
//   } catch (e) {
//     next(e);
//   }
// });

// // Get a specific card by ID
// router.get("/:id", async (req, res, next) => {
//   try {
//     const { id } = req.params;

//     const card = await Card.findById(id);

//     return res.json(card);
//   } catch (e) {
//     next(e);
//   }
// });


// //update a card by ID
// router.put("/:id", async (req, res, next) => {
//   try {
//     const { id } = req.params;

//     const card = await Card.findByIdAndUpdate(id, req.body  as ICardInput, { new: true });

//     return res.json(card);
//   } catch (e) {
//     next(e);
//   }
// }
// );


// //like or dislike a card

// router.patch("/:id", async (req, res, next) => {
//   try {
//     const { id } = req.params;

//     const card = await Card.findByIdAndUpdate
//     (id, req.body as ICardInput, { new: true });

//     return res.json(card);
//   } catch (e) {
//     next(e);
//   }
// }
// );


// //patch biz number by ID

// router.patch("/:id", async (req, res, next) => {
//   try {
//     const { id } = req.params;

//     const card = await Card.findByIdAndUpdate
//     (id, req.body as ICardInput, { new: true });

//     return res.json(card);
//   } catch (e) {
//     next(e);
//   }
// }
// );


// //delete a card by ID
// router.delete("/:id", async (req, res, next) => {
//   try {
//     const { id } = req.params;

//     const card = await Card.findByIdAndDelete(id);

//     return res.json(card);
//   } catch (e) {
//     next(e);
//   }
// }
// );





// export { router as cardsRouter };




















// import { Router } from "express";
// import { isBusiness } from "../middleware/Is-business";
// import { validateCard } from "../middleware/validation/ValidetionsJoi";
// import { createCard } from "../service/Card-service";
// import { ICardInput } from "../@types/Card";
// import { BizCardsError } from "../error/Biz-cards-error";
// import { Card } from "../models/Cards";
// import { validateToken } from "../middleware/Validate-token";
// import morgan from "morgan";
// import { Logger } from "../logs/Logger";

// const router = Router();

// // Create a new Logger instance
// const logger = new Logger();

// // Use Morgan for basic request logging
// router.use(morgan("dev"));

// // Create a new card
// router.post("/", validateToken, isBusiness, validateCard, async (req, res, next) => {
//   try {
//     const userId = req.user?._id!;

//     if (!userId) {
//       throw new BizCardsError("User must have an id", 500);
//     }

//     const savedCard = await createCard(req.body as ICardInput, userId);

//     // Log successful creation of a new card
//     Logger.info(`New card created by user ${userId}`);

//     res.json({ card: savedCard });
//   } catch (e) {
//     next(e);
//   }
// });

// // Get all cards
// router.get("/", async (_req, res, next) => {
//   try {
//     const cards = await Card.find();

//     // Log retrieval of all cards
//     Logger.info("All cards retrieved");

//     return res.json(cards);
//   } catch (e) {
//     next(e);
//   }
// });

// // Get cards belonging to the authenticated user
// router.get("/my-cards", validateToken, async (req, res, next) => {
//   try {
//     const userId = req.user?._id!;

//     const cards = await Card.find({ userId });

//     // Log retrieval of user-specific cards
//     Logger.info(`Cards belonging to user ${userId} retrieved`);

//     return res.json(cards);
//   } catch (e) {
//     next(e);
//   }
// });

// // Get a specific card by ID
// router.get("/:id", async (req, res, next) => {
//   try {
//     const { id } = req.params;

//     const card = await Card.findById(id);

//     // Log retrieval of a specific card
//     if (card) {
//       Logger.info(`Card with ID ${id} retrieved`);
//     } else {
//       Logger.warn(`Card with ID ${id} not found`);
//     }

//     return res.json(card);
//   } catch (e) {
//     next(e);
//   }
// });

// // Update a card by ID
// router.put("/:id", async (req, res, next) => {
//   try {
//     const { id } = req.params;

//     const card = await Card.findByIdAndUpdate(id, req.body as ICardInput, { new: true });

//     // Log update of a specific card
//     if (card) {
//       Logger.info(`Card with ID ${id} updated`);
//     } else {
//       Logger.warn(`Card with ID ${id} not found for update`);
//     }

//     return res.json(card);
//   } catch (e) {
//     next(e);
//   }
// });

// // Like or dislike a card
// router.patch("/:id", async (req, res, next) => {
//   try {
//     const { id } = req.params;

//     const card = await Card.findByIdAndUpdate(id, req.body as ICardInput, { new: true });

//     // Log patch (like/dislike) of a specific card
//     if (card) {
//       Logger.info(`Card with ID ${id} liked/disliked`);
//     } else {
//       Logger.warn(`Card with ID ${id} not found for like/dislike`);
//     }

//     return res.json(card);
//   } catch (e) {
//     next(e);
//   }
// });

// // Patch business number by ID (assuming this was meant to be separate from cards operations)
// router.patch("/biz-number/:id", async (req, res, next) => {
//   try {
//     const { id } = req.params;

//     const card = await Card.findByIdAndUpdate(id, req.body as ICardInput, { new: true });

//     // Log patch of business number for a specific card
//     if (card) {
//       Logger.info(`Business number patched for card with ID ${id}`);
//     } else {
//       Logger.warn(`Card with ID ${id} not found for business number patch`);
//     }

//     return res.json(card);
//   } catch (e) {
//     next(e);
//   }
// });

// // Delete a card by ID
// router.delete("/:id", async (req, res, next) => {
//   try {
//     const { id } = req.params;

//     const card = await Card.findByIdAndDelete(id);

//     // Log deletion of a specific card
//     if (card) {
//       Logger.info(`Card with ID ${id} deleted`);
//     } else {
//       Logger.warn(`Card with ID ${id} not found for deletion`);
//     }

//     return res.json(card);
//   } catch (e) {
//     next(e);
//   }
// });

// export { router as cardsRouter };


import { Router } from "express";
import morgan from "morgan";
import { Logger } from "../logs/Logger"; // Adjust the import to match your actual file structure
import { validateToken } from "../middleware/Validate-token";
import { isBusiness } from "../middleware/Is-business";
import { validateCard } from "../middleware/validation/ValidetionsJoi";
import { createCard } from "../service/Card-service";
import { ICardInput } from "../@types/Card";
import { BizCardsError } from "../error/Biz-cards-error";
import { Card } from "../models/Cards";
import { isAdmin } from "../middleware/Is-admin";

const router = Router();

// Use Morgan for basic request logging
router.use(morgan("dev"));

// Create a new card
router.post("/", validateToken, isBusiness, validateCard, async (req, res, next) => {
  try {
    const userId = req.user?._id!;
    if (!userId) {
      throw new BizCardsError("User must have an id", 500);
    }
    const savedCard = await createCard(req.body as ICardInput, userId);
    // Log successful creation of a new card
    Logger.info(`New card created by user ${userId}`);
    res.json({ card: savedCard });
  } catch (e) {
    next(e);
  }
});

// Get all cards
router.get("/", async (_req, res, next) => {
  try {
    const cards = await Card.find();
    // Log retrieval of all cards
    Logger.info("All cards retrieved");
    return res.json(cards);
  } catch (e) {
    next(e);
  }
});

// Get cards belonging to the authenticated user
router.get("/my-cards", validateToken, async (req, res, next) => {
  try {
    const userId = req.user?._id!;
    const cards = await Card.find({ userId });
    // Log retrieval of user-specific cards
    Logger.info(`Cards belonging to user ${userId} retrieved`);
    return res.json(cards);
  } catch (e) {
    next(e);
  }
});

// Get a specific card by ID
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const card = await Card.findById(id);
    // Log retrieval of a specific card
    if (card) {
      Logger.info(`Card with ID ${id} retrieved`);
    } else {
      Logger.warn(`Card with ID ${id} not found`);
    }
    return res.json(card);
  } catch (e) {
    next(e);
  }
});

// Update a card by ID
router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const card = await Card.findByIdAndUpdate(id, req.body as ICardInput, { new: true });
    // Log update of a specific card
    if (card) {
      Logger.info(`Card with ID ${id} updated`);
    } else {
      Logger.warn(`Card with ID ${id} not found for update`);
    }
    return res.json(card);
  } catch (e) {
    next(e);
  }
});

// Like or dislike a card
 //if request sent it is liked if sent again make card unliked
//save likes for each card inside the array of likes

router.patch("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const card = await Card.findByIdAndUpdate(id, req.body as ICardInput, { new: true });
    // Log patch (like/dislike) of a specific card
    if (card) {
      Logger.info(`Card with ID ${id} liked/disliked`);
    } else {
      Logger.warn(`Card with ID ${id} not found for like/dislike`);
    }
    return res.json(card);
  } catch (e) {
    next(e);
  }
}
);









// Patch business number by ID (assuming this was meant to be separate from cards operations)
router.patch("/biz-number/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const card = await Card.findByIdAndUpdate(id, req.body as ICardInput, { new: true });
    // Log patch of business number for a specific card
    if (card) {
      Logger.info(`Business number patched for card with ID ${id}`);
    } else {
      Logger.warn(`Card with ID ${id} not found for business number patch`);
    }
    return res.json(card);
  } catch (e) {
    next(e);
  }
});

// Delete a card by ID
router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const card = await Card.findByIdAndDelete(id);
    // Log deletion of a specific card
    if (card) {
      Logger.info(`Card with ID ${id} deleted`);
    } else {
      Logger.warn(`Card with ID ${id} not found for deletion`);
    }
    return res.json(card);
  } catch (e) {
    next(e);
  }
});


//allow admin to change bizNumber in condition it is not in use by another user
router.patch("/biz-number/:id", isAdmin, async (req, res, next) => {
  try {
    const { id } = req.params;
    const card = await Card.findByIdAndUpdate(id, req.body as ICardInput, { new: true });
    // Log patch of business number for a specific card
    if (card) {
      Logger.info(`Business number patched for card with ID ${id}`);
    } else {
      Logger.warn(`Card with ID ${id} not found for business number patch`);
    }
    return res.json(card);
  } catch (e) {
    next(e);
  }
}
);


// Export the router at the end
export { router as cardsRouter };
