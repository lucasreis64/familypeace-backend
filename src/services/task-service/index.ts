import { notFoundError } from "@/errors/not-found-error";
import { createOrUpdateTaskParams, taskFilterParams, taskResult } from "@/protocols";
import { enrollmentRepository, taskMembersRepository, taskRepository } from "@/repositories";
import { exclude } from "@/utils/prisma-utils";
import { task } from "@prisma/client";
import { invalidUserIdError } from "@/errors";
import { familyService } from "../family-service";
import { filterTask } from "./filterTask";

async function validateTaskId(id: number): Promise<void> {
  const task = await taskRepository.findOne(id);

  if(!task)
    throw notFoundError();
}

async function validateIfUserIsFromFamily(userId: number, realFamilyId: number): Promise<void> {
  const family = await enrollmentRepository.findFamilyByUserId(userId);
  
  if(!family || family.familyId !== realFamilyId)
    throw invalidUserIdError();
}

async function getTasks(body: taskFilterParams, userId: number): Promise<taskResult> {
  const { familyId } = await enrollmentRepository.findFamilyByUserId(userId);

  if(typeof body.from === "number")
    await validateIfUserIsFromFamily(userId, familyId);

  const whereInput = filterTask(body, familyId);

  const tasks = await taskRepository.findMany(whereInput);

  return tasks.map((task) => ({
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
  }));
}

async function createOrUpdateTask(body: createOrUpdateTaskParams): Promise<task> {
  let id = body?.id;

  if (id)
    await validateTaskId(id);

  else
    id = -20;

  await familyService.validateFamilyId(body.familyId);

  if(body.when)
    body.when = new Date(body.when);

  const task = await taskRepository.upsert(id, exclude(body, "id"));
  
  return task;
}

async function deleteTask(id: number): Promise<{deletedId: number}> {
  await validateTaskId(id);

  await taskMembersRepository.removeMany(id);

  const deletedTask = await taskRepository.remove(id);
  
  return { deletedId: deletedTask.id };
}

const taskService= {
  createOrUpdateTask,
  deleteTask,
  getTasks,
  validateTaskId,
  validateIfUserIsFromFamily
};

export { taskService };
