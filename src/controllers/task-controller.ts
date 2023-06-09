import { AuthenticatedRequest } from "@/middlewares";
import { taskFilterParams } from "@/protocols";
import { taskService } from "@/services";
import { Response } from "express";
import httpStatus from "http-status";

export async function getTasks(req: AuthenticatedRequest, res: Response) {
  const { period, status, from }: taskFilterParams = req.query as taskFilterParams;
  const { userId } = req;

  try {
    const task = await taskService.getTasks({ period, status, from }, userId);

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

export async function postCreateOrUpdateTask(req: AuthenticatedRequest, res: Response) {
  const { body } = req;

  try {
    const task = await taskService.createOrUpdateTask(body);

    return res.status(httpStatus.CREATED).send(task);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
  }
}

export async function deleteTask(req: AuthenticatedRequest, res: Response) {
  const { id } = req.params;

  try {
    const task = await taskService.deleteTask(Number(id));

    return res.status(httpStatus.OK).send(task);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
  }
}
