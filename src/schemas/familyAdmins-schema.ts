import Joi from "joi";

export const createFamilyAdminSchema = Joi.object<{id: number}>({
  id: Joi.number().min(1).strict().required(),
});

export const deleteFamilyAdminSchema = Joi.object<{id: number}>({
  id: Joi.number().min(1).strict().required(),
});
