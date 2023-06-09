import { createOrUpdateTaskParams, taskFilterParams } from "@/protocols";
import Joi from "joi";

export const createOrUpdateTaskSchema = Joi.object<createOrUpdateTaskParams>({
  familyId: Joi.number().min(1).strict(),
  id: Joi.number().min(1).strict(),
  when: Joi.string().isoDate().required(),
  name: Joi.string().max(30).min(3).required(),
  status: Joi.string().valid("pending", "doing", "done").required()
});

export const getTaskSchema = Joi.object<taskFilterParams>({
  period: Joi.string().valid("day", "week", "month", "all").required(),
  from: Joi.alternatives().try(
    Joi.number().min(1).strict(),
    Joi.string().valid("family")
  ).required(),
  status: Joi.string().valid("pending", "doing", "done", "all").required()
});
