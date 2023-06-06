import { alreadyAdminError, alreadyNotAdminError, notAdminError, notFamilyMemberError } from "@/errors";
import { enrollmentRepository, familyAdminsRepository } from "@/repositories";
import { familyAdmins } from "@prisma/client";
import { taskService } from "../task-service";

async function validateIfUserIsAdmin(userId: number, action: "create" | "check" | "delete" ): Promise<number> {
  const { familyId } = await enrollmentRepository.findFamilyByUserId(userId);

  if (!familyId) 
    notFamilyMemberError();

  const user = await familyAdminsRepository.findOne(userId, familyId);

  if(!user && action === "check")
    throw notAdminError();

  if(user && action === "create")
    throw alreadyAdminError();

  if(!user && action === "delete")
    throw alreadyNotAdminError();

  return familyId;
}

async function getFamilyAdmins(userId: number) {
  const { familyId } = await enrollmentRepository.findFamilyByUserId(userId);

  if (!familyId) 
    notFamilyMemberError();

  const familyAdmins = await familyAdminsRepository.findMany(familyId);

  return familyAdmins;
}

async function createFamilyAdmin(adminId: number, newAdminId: number): Promise<familyAdmins> {
  const familyId = await validateIfUserIsAdmin(newAdminId, "create");

  await validateIfUserIsAdmin(adminId, "check");

  await taskService.validateIfUserIsFromFamily(newAdminId, familyId);

  const newFamilyAdmin = await familyAdminsRepository.create(newAdminId, familyId);

  return newFamilyAdmin;
}

async function deleteFamilyAdmin(adminId: number, adminToDeleteId: number): Promise<{ deletedAdminId: number }> {
  const familyId = await validateIfUserIsAdmin(adminId, "check");

  await validateIfUserIsAdmin(adminToDeleteId, "delete");

  await taskService.validateIfUserIsFromFamily(adminToDeleteId, familyId);

  await familyAdminsRepository.remove({ familyId, userId: adminToDeleteId });

  return { deletedAdminId: adminToDeleteId };
}

const familyAdminsService = {
  createFamilyAdmin,
  deleteFamilyAdmin,
  getFamilyAdmins,
};

export { familyAdminsService };
