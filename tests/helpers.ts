import * as jwt from "jsonwebtoken";
import { user } from "@prisma/client";

import { createUser } from "./factories";
import { createSession } from "./factories/sessions-factory";
import { prisma } from "@/config";

export async function cleanDb() {
  await prisma.enrollment.deleteMany({});
  await prisma.points.deleteMany({});
  await prisma.taskMembers.deleteMany({});
  await prisma.task.deleteMany({});
  await prisma.session.deleteMany({});
  await prisma.family.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.points.deleteMany({});
}

export async function generateValidToken(user?: user) {
  const incomingUser = user || (await createUser());
  const token = jwt.sign({ userId: incomingUser.id }, process.env.JWT_SECRET);

  await createSession(token);

  return token;
}
