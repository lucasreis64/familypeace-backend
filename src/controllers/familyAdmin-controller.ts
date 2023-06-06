import { AuthenticatedRequest } from "@/middlewares";
import { familyAdminsService } from "@/services/familyAdmins-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getFamilyAdmins(req: AuthenticatedRequest, res: Response) {
  const { userId } = req.params;

  try {
    const familyAdmins = await familyAdminsService.getFamilyAdmins(Number(userId));

    return res.status(httpStatus.OK).send(familyAdmins);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
  }
}

export async function postFamilyAdmin(req: AuthenticatedRequest, res: Response) {
  const { body } = req;
  const { userId } = req;

  try {
    const familyAdmin = await familyAdminsService.createFamilyAdmin(body.userId, userId);

    return res.status(httpStatus.OK).send(familyAdmin);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
  }
}

export async function deleteFamilyAdmin(req: AuthenticatedRequest, res: Response) {
  const { params } = req;
  const { userId } = req;

  try {
    const familyAdmin = await familyAdminsService.deleteFamilyAdmin(userId, Number(params.userId));

    return res.status(httpStatus.OK).send(familyAdmin);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
  }
}
