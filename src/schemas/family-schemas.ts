import { createOrUpdateFamilyParams } from "@/protocols";
import Joi from "joi";

export const createOrUpdateFamilySchema = Joi.object<createOrUpdateFamilyParams>({
  id: Joi.number().min(1).strict(),
  name: Joi.string().min(3).max(30).required(),
});

export const updateUserFamilySchema = Joi.object<{familyId: number}>({
  familyId: Joi.number().min(1).strict(),
});
