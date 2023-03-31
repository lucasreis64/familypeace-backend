import { prisma } from "@/config";
import { Prisma } from "@prisma/client";

async function create(data: Prisma.enrollmentCreateInput) {
  return prisma.enrollment.create({
    data,
  });
}

async function upsert(userId: number, createdEnrollment: Prisma.enrollmentCreateInput) {
  return "oi";
}

const enrollmentRepository = {
  create,
  upsert
};

export default enrollmentRepository;
