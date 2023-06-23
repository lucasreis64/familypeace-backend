import { deleteFamilyAdmin, getFamilyAdmins, postFamilyAdmin } from "@/controllers/familyAdmin-controller";
import { authenticateToken, validateBody, validateParams } from "@/middlewares";
import { createFamilyAdminSchema, deleteFamilyAdminSchema } from "@/schemas/familyAdmins-schema";
import { Router } from "express";

const familyAdminsRouter = Router();

familyAdminsRouter
  .all("/*", authenticateToken)
  .get("/",  getFamilyAdmins)
  .post("/", validateBody(createFamilyAdminSchema), postFamilyAdmin)
  .delete("/delete", validateParams(deleteFamilyAdminSchema), deleteFamilyAdmin);

export { familyAdminsRouter };

