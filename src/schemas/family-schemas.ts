import { createOrUpdateFamilyParams } from "@/protocols";
import Joi from "joi";

export const createOrUpdateFamilySchema = Joi.object<createOrUpdateFamilyParams>({
  id: Joi.number().min(1).strict(),
  name: Joi.string().min(3).max(30).required(),
  familyPicture: Joi.string(),
});

export const updateUserFamilySchema = Joi.object<{familyId: number | null, userId: number}>({
  familyId: Joi.number().min(1).strict().allow(null).required(),
  userId: Joi.number().min(1).strict().required(),
});

export const getUserFamilySchema = Joi.object<{userId: number}>({
  userId: Joi.number().min(1).strict(),
});

