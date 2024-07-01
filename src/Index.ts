
// //index.ts

// import configDotEnv from "./config/Config";

// import express, { json } from "express";
// import { notFound } from "./middleware/not-found";
// import { usersRouter } from "./routes/userroutes";
// import { connect } from "./config/connection";
// import { errorHandler } from "./middleware/error-handler";
// import morgan from "morgan";
// import cors from "cors";
// import { cardsRouter } from "./routes/cardroutes";
// import { Logger } from "./logs/logger";

// configDotEnv();
// connect();

// const app = express();
// app.use(
//   cors({
//     // allow my client side
//     origin: "http://localhost:5173/",
//   })
// );
// //localhost:8080/foo.html
// app.use(express.static("public"));
// // middleware chain:
// app.use(json());
// app.use(morgan("dev"));
// app.use("/api/v1/users", usersRouter); //next(err)
// app.use("/api/v1/cards", cardsRouter);
// app.use(errorHandler);
// app.use(notFound);


// const PORT = process.env.PORT ?? 3000;

// app.listen(process.env.PORT, ()=>{
//   // callback when the app is running:
//   Logger.info(`App is running: http://localhost:${PORT}`);
// });
import express, { json } from "express";
import { notFound } from "./middleware/Not-found";
import { usersRouter } from "./routes/Userroutes";
import { connect } from "./config/Connection";
import { errorHandler } from "./middleware/Error-handler";
import morgan from "morgan";
import cors from "cors";
import { cardsRouter } from "./routes/Cardroutes";
import { Logger } from "./logs/Logger";
import configDotEnv from "./config/Config";
import path from "path";

// Load environment configuration
configDotEnv();

// Connect to database
connect();

const app = express();
app.use(
  cors({
    origin: "http://localhost:27017/",
  })
);
app.use(express.static(path.join(__dirname, 'public')));

// app.use(express.static("public"));

app.use(json());
app.use(morgan("dev"));
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/cards", cardsRouter);
app.use(errorHandler);
app.use(notFound);

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
  Logger.info(`App is running: http://localhost:${PORT}`);
});
