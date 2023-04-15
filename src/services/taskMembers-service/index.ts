import { alreadyTaskMember } from "@/errors";
import { notFoundError } from "@/errors/not-found-error";
import { taskMembersParams } from "@/protocols";
import { taskMembersRepository, taskRepository } from "@/repositories";
import { taskService } from "../task-service";

async function validateTaskMemberId( taskId: number, userId: number, worstCase?: boolean): Promise<void> {
  const taskMember = await taskMembersRepository.findOne({ taskId, userId });

  if(worstCase && taskMember) 
    throw alreadyTaskMember();

  if(!worstCase && !taskMember)
    throw notFoundError();
}

async function validateTaskIdAndUserId(taskId: number, userId: number): Promise<void> {
  const { familyId } = await taskRepository.findOne(taskId);

  if(!familyId)
    throw notFoundError();
  
  await taskService.validateIfUserIsFromFamily(userId, familyId);
}

async function createTaskMember(body: taskMembersParams): Promise<void> {
  const { userId, taskId } = body;

  await validateTaskMemberId(taskId, userId, true);
  
  await validateTaskIdAndUserId(taskId, userId);

  await taskMembersRepository.create(body);
}

async function deleteTaskMember(id: number): Promise<{deletedId: number}> {
  const taskMembers = await taskMembersRepository.findOne({ id });
  if (!taskMembers)
    throw notFoundError();

  const deletedTaskMember = await taskMembersRepository.remove(id);
  
  return { deletedId: deletedTaskMember.id };
}

const taskMembersService= {
  createTaskMember,
  deleteTaskMember,
};

export { taskMembersService };
