import { AuthenticatedRequest } from "@/middlewares";
import { taskService } from "@/services";
import { Response } from "express";
import httpStatus from "http-status";

export async function postCreateOrUpdateTask(req: AuthenticatedRequest, res: Response) {
  const { body } = req;

  try {
    const task = await taskService.createOrUpdateTask(body);

    return res.status(httpStatus.OK).send(task);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    console.log(error);
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
