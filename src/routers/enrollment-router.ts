import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getEnrollmentByUser } from "@/controllers";

const enrollmentRouter = Router();

enrollmentRouter
  .all("/*", authenticateToken)
  .get("/", getEnrollmentByUser);

export { enrollmentRouter };
