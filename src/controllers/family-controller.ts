import { AuthenticatedRequest } from "@/middlewares";
import { familyService } from "@/services";
import { Response } from "express";
import httpStatus from "http-status";

export async function postCreateOrUpdateFamily(req: AuthenticatedRequest, res: Response) {
  const { body } = req;

  try {
    const family = await familyService.createOrUpdateFamily(body);

    return res.status(httpStatus.OK).send(family);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
  }
}

export async function deleteFamily(req: AuthenticatedRequest, res: Response) {
  const { id } = req.params;

  try {
    const family = await familyService.deleteFamily(Number(id));

    return res.status(httpStatus.OK).send(family);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
  }
}

export async function updateUserFamily(req: AuthenticatedRequest, res: Response) {
  const { id } = req.params;
  const { familyId } = req.body;

  try {
    const family = await familyService.updateUserFamily(Number(id), familyId);

    return res.status(httpStatus.OK).send(family);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
  }
}

