import { taskMembersParams } from "@/protocols";
import Joi from "joi";

export const createTaskMembersSchema = Joi.object<taskMembersParams>({
  taskId: Joi.number().min(1).strict(),
  userId: Joi.number().min(1).strict(),
});
