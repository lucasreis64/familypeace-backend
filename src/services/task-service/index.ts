import { notFoundError } from "@/errors/not-found-error";
import { createOrUpdateTaskParams, taskFilterParams, taskResult } from "@/protocols";
import { enrollmentRepository, taskRepository } from "@/repositories";
import { exclude } from "@/utils/prisma-utils";
import { task } from "@prisma/client";
import { familyService } from "../family-service";
import { invalidUserIdError } from "./errors";
import { filterTask } from "./filterTask";

async function validateTaskId(id: number): Promise<void> {
  const task = await taskRepository.findOne(id);

  if(!task)
    throw notFoundError();
}

async function validateIfUserIsFromFamily(userId: number, realFamilyId: number): Promise<void> {
  const { familyId } = await enrollmentRepository.findFamilyByUserId(userId);

  if(familyId !== realFamilyId)
    throw invalidUserIdError();
}

async function getTasks(body: taskFilterParams, userId: number): Promise<taskResult> {
  const { familyId } = await enrollmentRepository.findFamilyByUserId(userId);

  if(typeof body.from === "number")
    await validateIfUserIsFromFamily(userId, familyId);

  const whereInput = filterTask(body, familyId);

  const tasks = await taskRepository.findMany(whereInput);

  return tasks;
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

  const deletedTask = await taskRepository.remove(id);
  
  return { deletedId: deletedTask.id };
}

const taskService= {
  createOrUpdateTask,
  deleteTask,
  getTasks
};

export { taskService };
