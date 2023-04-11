import { prisma } from "@/config";
import { createOrUpdateFamilyParams } from "@/protocols";

async function upsert(id: number, body: createOrUpdateFamilyParams) {
  return prisma.family.upsert({
    where: {
      id
    },
    create: body,
    update: body,
  });
}

async function remove(id: number) {
  return prisma.family.delete({
    where: {
      id
    }
  });
}

async function findOne(id: number) {
  return prisma.family.findUnique({
    where: {
      id
    }
  });
}

async function findMany() {
  return prisma.family.findMany();
}

const familyRepository = {
  upsert,
  remove,
  findOne,
  findMany
};

export { familyRepository };
