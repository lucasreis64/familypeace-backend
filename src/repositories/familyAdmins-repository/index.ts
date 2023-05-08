import { prisma } from "@/config";

async function create(userId: number, familyId: number) {
  return prisma.familyAdmins.create({
    data: {
      userId,
      familyId
    }
  });
}

export type deleteFamilyAdminsParams = {
  userId?: number,
  familyId?: number,
}

async function remove(body: deleteFamilyAdminsParams) {
  return prisma.familyAdmins.deleteMany({
    where: body
  });
}

const familyAdminsRepository = {
  create,
  remove
};

export { familyAdminsRepository };

