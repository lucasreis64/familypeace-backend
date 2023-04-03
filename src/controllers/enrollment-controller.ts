import { AuthenticatedRequest } from "@/middlewares";
import enrollmentsService from "@/services/enrollment-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getEnrollmentByUser(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  console.log(userId);
  try {
    const enrollment = await enrollmentsService.getEnrollmentByUserId(userId);

    return res.status(httpStatus.OK).send(enrollment);
  } catch (error) {
    console.error(error);
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}
