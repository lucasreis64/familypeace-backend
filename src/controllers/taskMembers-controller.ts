import { AuthenticatedRequest } from "@/middlewares";
import { taskMembersService } from "@/services";
import { Response } from "express";
import httpStatus from "http-status";

export async function postTaskMember(req: AuthenticatedRequest, res: Response) {
  const { body } = req;

  try {
    await taskMembersService.createTaskMember(body);

    return res.sendStatus(httpStatus.CREATED);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    if (error.name === "InvalidUserIdError") {
      return res.sendStatus(httpStatus.FORBIDDEN);
    }
    if (error.name === "alreadyTaskMember") {
      return res.sendStatus(httpStatus.CONFLICT);
    }
  }
}

export async function deleteTaskMember(req: AuthenticatedRequest, res: Response) {
  const { id } = req.params;

  try {
    const task = await taskMembersService.deleteTaskMember(Number(id));

    return res.status(httpStatus.OK).send(task);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    if (error.name === "InvalidUserIdError") {
      return res.sendStatus(httpStatus.FORBIDDEN);
    }
  }
}
