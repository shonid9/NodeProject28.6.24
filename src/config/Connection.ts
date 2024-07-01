


//connection.ts


// pnpm add mongoose
import { Logger } from "../logs/Logger";
import { initDB } from "./InitDB";
import mongoose from "mongoose";


async function connect() {
  try {
    const connectionString = process.env.MONGO_URI_DEV || "mongodb://localhost:27017/Clusterd0"; 
    await mongoose.connect(connectionString);
    console.info('Connected to database');

    //connect to the database:
    await mongoose.connect(connectionString);

    //blue:
    Logger.debug("Database Connected");
    //init the database:
    await initDB();
  } catch (err) {
    Logger.error("Error Connecting to database", err);
  }
};

export { connect };
