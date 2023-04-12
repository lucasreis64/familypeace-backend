import { prisma } from "@/config";
import { task } from "@prisma/client";

async function findOne(id: number) {
  return prisma.task.findUnique({
    where: {
      id
    }
  });
}

type createdOrUpdatedTaskParams = Omit<task, "createdAt" | "updatedAt" | "id">;

async function upsert(id: number, body: createdOrUpdatedTaskParams) {
  return prisma.task.upsert({
    where: {
      id
    },
    create: body,
    update: body
  });
}

async function remove(id: number) {
  return prisma.task.delete({
    where: {
      id
    }
  });
}

const taskRepository = {
  upsert,
  remove,
  findOne
};

export { taskRepository };
