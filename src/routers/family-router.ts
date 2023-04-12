import { deleteFamily, postCreateOrUpdateFamily } from "@/controllers";
import { authenticateToken, validateBody } from "@/middlewares";
import { createOrUpdateFamilySchema } from "@/schemas";
import { Router } from "express";

const familyRouter = Router();

familyRouter
  .all("/*", authenticateToken)
  .post("/", validateBody(createOrUpdateFamilySchema), postCreateOrUpdateFamily)
  .delete("/:id", deleteFamily);

export { familyRouter };

