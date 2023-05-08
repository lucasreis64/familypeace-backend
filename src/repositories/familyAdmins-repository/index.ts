import { prisma } from "@/config";

async function create(userId: number, familyId: number) {
  return prisma.familyAdmins.create({
    data: {
      userId,
      familyId
    }
  });
}

const familyAdminsRepository = {
  create,
};

export { familyAdminsRepository };

