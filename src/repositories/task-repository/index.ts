import { prisma } from "@/config";
import { taskWhereParams } from "@/protocols";
import { task } from "@prisma/client";

async function findOne(id: number) {
  return prisma.task.findUnique({
    where: {
      id
    }
  });
}

async function findMany(body: taskWhereParams) {
  return prisma.task.findMany({
    where: body,
    select: {
      id: true,
      name: true,
      familyId: true,
      status: true,
      taskMembers: {
        select: {
          user: {
            select: {
              enrollment: {
                select: {
                  userId: true,
                  name: true,
                }
              }
            }
          }
        }
      }
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
  findOne,
  findMany
};

export { taskRepository };
