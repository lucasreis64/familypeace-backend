import { deleteFamily, getUserFamily, postCreateOrUpdateFamily, updateUserFamily } from "@/controllers";
import { authenticateToken, validateBody, validateParams } from "@/middlewares";
import { createOrUpdateFamilySchema, getUserFamilySchema, updateUserFamilySchema } from "@/schemas";
import { Router } from "express";

const familyRouter = Router();

familyRouter
  .all("/*", authenticateToken)
  .get("/:userId", validateParams(getUserFamilySchema), getUserFamily)
  .post("/", validateBody(createOrUpdateFamilySchema), postCreateOrUpdateFamily)
  .post("/user", validateBody(updateUserFamilySchema), updateUserFamily)
  .delete("/:id", deleteFamily);

export { familyRouter };

