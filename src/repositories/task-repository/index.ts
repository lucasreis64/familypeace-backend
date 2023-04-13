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
  const tasks = await prisma.task.findMany({
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

  return tasks.map((task) => ({
    task: {
      id: task.id,
      name: task.name,
      familyId: task.familyId,
      status: task.status,
      taskMembers: task.taskMembers.flatMap((taskMember) => {
        return taskMember.user.enrollment.map((enrollment) => ({
          userId: enrollment.userId,
          name: enrollment.name
        }));
      })
    }
  }));
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
