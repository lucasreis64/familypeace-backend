import { prisma } from "@/config";

async function findMany(familyId: number) {
  return prisma.familyAdmins.findMany({
    where: {
      familyId
    }
  });
}

async function findOne(userId: number, familyId: number) {
  return prisma.familyAdmins.findFirst({
    where: {
      userId,
      familyId
    }
  });
}

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
  remove,
  findMany,
  findOne
};

export { familyAdminsRepository };

