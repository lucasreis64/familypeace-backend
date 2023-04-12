import { Router } from "express";
import { authenticateToken, validateBody } from "@/middlewares";
import { getEnrollmentByUser, postCreateOrUpdateEnrollment } from "@/controllers";
import { createEnrollmentSchema } from "@/schemas";

const enrollmentRouter = Router();

enrollmentRouter
  .all("/*", authenticateToken)
  .get("/", getEnrollmentByUser)
  .post("/", validateBody(createEnrollmentSchema), postCreateOrUpdateEnrollment);

export { enrollmentRouter };
