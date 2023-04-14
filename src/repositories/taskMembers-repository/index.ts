import { prisma } from "@/config";
import { taskMembers } from "@prisma/client";

async function findOne(userId: number) {
  return prisma.task.findUnique({
    where: {
      userId
    }
  });
}

async function create(id: number, body: createTaskMembersParams) {
  return prisma.taskMembers.create({
    data: body,
  });
}

export type createTaskMembersParams = Pick<taskMembers, "userId" | "taskId">

async function remove(id: number) {
  return prisma.taskMembers.delete({
    where: {
      id
    }
  });
}

const taskMembersRepository = {
  create,
  remove,
  findOne
};

export { taskMembersRepository };
