import { notFoundError } from "@/errors/not-found-error";
import { createOrUpdateFamilyParams } from "@/protocols";
import { enrollmentRepository, familyRepository } from "@/repositories";
import { exclude } from "@/utils/prisma-utils";
import { family } from "@prisma/client";

async function validateFamilyId(id: number): Promise<void> {
  const family = await familyRepository.findOne(id);

  if(!family)
    throw notFoundError();
}

type createOrUpdateFamilyResult = Omit<family, "createdAt" | "updatedAt">

async function createOrUpdateFamily(body: createOrUpdateFamilyParams): Promise<createOrUpdateFamilyResult> {
  let id = body?.id;

  if (id)
    await validateFamilyId(id);
  
  else
    id = -20;
  
  const family = await familyRepository.upsert(id, exclude(body, "id"));

  return { id: family.id, name: family.name };
}

async function deleteFamily(id: number): Promise<{deletedId: number}> {
  await validateFamilyId(id);

  await enrollmentRepository.deleteUserFamily(id);

  const deletedFamily = await familyRepository.remove(id);
  
  return { deletedId: deletedFamily.id };
}

async function updateUserFamily(userId: number, id: number | null): Promise<{updatedFamilyId: number}> {
  if (id)
    await validateFamilyId(id);

  await enrollmentRepository.updateUserFamily(userId, { familyId: id });

  const updatedFamily = await familyRepository.remove(id);
  
  return { updatedFamilyId: updatedFamily.id };
}

const familyService = {
  createOrUpdateFamily,
  deleteFamily,
  validateFamilyId,
  updateUserFamily,
};

export { familyService };
