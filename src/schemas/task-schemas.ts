import { createOrUpdateTaskParams } from "@/protocols";
import Joi from "joi";

export const createOrUpdateTaskSchema = Joi.object<createOrUpdateTaskParams>({
  familyId: Joi.number().min(1).strict(),
  id: Joi.number().min(1).strict(),
  when: Joi.string().isoDate().required(),
  name: Joi.string().max(30).min(3).required(),
  status: Joi.string().valid("pending", "doing", "done").required()
});
