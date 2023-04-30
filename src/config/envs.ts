import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";

export async function loadEnv() {
  const path =
    process.env.NODE_ENV === "test"
      ? ".env.test"
      : process.env.NODE_ENV === "development"
        ? ".env.development"
        : ".env";

  const currentEnvs = dotenv.config({ path });
  return dotenvExpand.expand(currentEnvs);
}

loadEnv();
