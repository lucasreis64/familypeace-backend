import { deleteTask, postCreateOrUpdateTask } from "@/controllers";
import { authenticateToken, validateBody } from "@/middlewares";
import { createOrUpdateTaskSchema } from "@/schemas";
import { Router } from "express";

const taskRouter = Router();

taskRouter
  .all("/*", authenticateToken)
  .post("/", validateBody(createOrUpdateTaskSchema), postCreateOrUpdateTask)
  .delete("/:id", deleteTask);

export { taskRouter };

