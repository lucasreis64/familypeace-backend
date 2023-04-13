import { deleteTask, getTasks, postCreateOrUpdateTask } from "@/controllers";
import { authenticateToken, validateBody, validateQuery } from "@/middlewares";
import { createOrUpdateTaskSchema, getTaskSchema } from "@/schemas";
import { Router } from "express";

const taskRouter = Router();

taskRouter
  .all("/*", authenticateToken)
  .get("/", validateQuery(getTaskSchema), getTasks)
  .post("/", validateBody(createOrUpdateTaskSchema), postCreateOrUpdateTask)
  .delete("/:id", deleteTask);

export { taskRouter };

