import { deleteFamily, postCreateOrUpdateFamily, updateUserFamily } from "@/controllers";
import { authenticateToken, validateBody } from "@/middlewares";
import { createOrUpdateFamilySchema, updateUserFamilySchema } from "@/schemas";
import { Router } from "express";

const familyRouter = Router();

familyRouter
  .all("/*", authenticateToken)
  .post("/", validateBody(createOrUpdateFamilySchema), postCreateOrUpdateFamily)
  .post("/user", validateBody(updateUserFamilySchema), updateUserFamily)
  .delete("/:id", deleteFamily);

export { familyRouter };

