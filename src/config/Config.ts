

import { config } from "dotenv";

const configDotEnv = () => {
  // Load the general .env file
  config({ path: "src/config/.env.Dev" });

  const mode = process.env.NODE_ENV; // dev | test | prod
  console.log("App is running in", mode, "Mode");
  console.log("Config file:", `src/config/${mode}.env`);

  // Load the mode-specific .env file
  config({ path: `src/config/${mode}.env` });
};

export default configDotEnv;
