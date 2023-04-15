import { deleteTaskMember, postTaskMember } from "@/controllers";
import { authenticateToken, validateBody } from "@/middlewares";
import { createTaskMembersSchema } from "@/schemas";
import { Router } from "express";

const taskMembersRouter = Router();

taskMembersRouter
  .all("/*", authenticateToken)
  .post("/", validateBody(createTaskMembersSchema), postTaskMember)
  .delete("/:id", deleteTaskMember);

export { taskMembersRouter };

