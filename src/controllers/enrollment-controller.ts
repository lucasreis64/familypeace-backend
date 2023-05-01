import { AuthenticatedRequest } from "@/middlewares";
import enrollmentsService from "@/services/enrollment-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getEnrollmentByUser(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  try {
    const enrollment = await enrollmentsService.getEnrollmentByUserId(userId);

    return res.status(httpStatus.OK).send(enrollment);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function postCreateOrUpdateEnrollment(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { body } = req;

  try {
    const enrollment = await enrollmentsService.update(userId, body);

    return res.status(httpStatus.OK).send(enrollment);
  } catch (error) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}
