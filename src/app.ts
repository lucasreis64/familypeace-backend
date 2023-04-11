import express, { Express } from "express";
import cors from "cors";
import { usersRouter, authenticationRouter } from "@/routers";
import { loadEnv, connectDb, disconnectDB } from "@/config";
import { handleApplicationErrors } from "@/middlewares";
import { enrollmentRouter } from "./routers/enrollment-router";
import { familyRouter } from "./routers/family-router";

loadEnv();

const app = express();

app
  .use(cors())
  .use(express.json())
  .get("/health", (_req, res) => res.send("OK!"))
  .use("/sign-up", usersRouter)
  .use("/sign-in", authenticationRouter)
  .use("/enrollment", enrollmentRouter)
  .use("/family", familyRouter)
  .use(handleApplicationErrors);

export function init(): Promise<Express> {
  connectDb();
  return Promise.resolve(app);
}

export async function close(): Promise<void> {
  await disconnectDB();
}

export default app;
