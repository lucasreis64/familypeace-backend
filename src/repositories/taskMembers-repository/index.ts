import { prisma } from "@/config";
import { taskMembers } from "@prisma/client";

async function findOne(body: {taskId: number, userId: number} | {id: number}) {
  return prisma.taskMembers.findFirst({
    where: body
  });
}

async function create(body: createTaskMembersParams) {
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

async function removeMany(taskId: number) {
  return prisma.taskMembers.deleteMany({
    where: {
      taskId
    }
  });
}

const taskMembersRepository = {
  create,
  remove,
  findOne,
  removeMany
};

export { taskMembersRepository };
