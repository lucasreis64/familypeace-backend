import { notAdminError } from "@/errors";
import { familyAdminsRepository } from "@/repositories";
import { familyAdmins } from "@prisma/client";
import { taskService } from "../task-service";

async function validateIfUserIsAdmin(userId: number, familyId: number): Promise<void> {
  const user = await familyAdminsRepository.findOne(userId, familyId);

  if(!user)
    throw notAdminError();
}

async function createFamilyAdmin(adminId: number, newAdminId: number, familyId: number): Promise<familyAdmins> {
  await validateIfUserIsAdmin(adminId, familyId);

  await taskService.validateIfUserIsFromFamily(newAdminId, familyId);

  const newFamilyAdmin = await familyAdminsRepository.create(newAdminId, familyId);

  return newFamilyAdmin;
}

async function deleteFamilyAdmin(adminId: number, adminToDeleteId: number) {
  return;
}

const familyAdminsService = {
  createFamilyAdmin,
};

export { familyAdminsService };
