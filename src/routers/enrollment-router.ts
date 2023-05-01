import { Router } from "express";
import { authenticateToken, validateBody } from "@/middlewares";
import { getEnrollmentByUser, postCreateOrUpdateEnrollment } from "@/controllers";
import { updateEnrollmentSchema } from "@/schemas";

const enrollmentRouter = Router();

enrollmentRouter
  .all("/*", authenticateToken)
  .get("/", getEnrollmentByUser)
  .post("/", validateBody(updateEnrollmentSchema), postCreateOrUpdateEnrollment);

export { enrollmentRouter };
