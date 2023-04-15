import { prisma } from "@/config";
import { Prisma } from "@prisma/client";

async function findById(userId: number) {
  return prisma.enrollment.findFirst({
    where: { userId },
    select: {
      id: true,
      birthday: true,
      phone: true,
      profilePicture: true,
      family: {
        select: {
          name: true,
        }
      }
    },
  });
}

async function findFamilyByUserId(userId: number) {
  return prisma.enrollment.findFirst({
    where: { userId },
    select: {
      familyId: true,
    }
  });
}

async function upsert(userId: number,
  createdEnrollment: CreateEnrollmentParams,
  updatedEnrollment: UpdateEnrollmentParams,
) {
  return prisma.enrollment.upsert({
    where: {
      userId,
    },
    create: createdEnrollment,
    update: updatedEnrollment,
  });
}
export type CreateEnrollmentParams = Omit<Prisma.enrollmentUncheckedCreateInput, "id" | "createdAt" | "updatedAt">;
export type UpdateEnrollmentParams = Omit<CreateEnrollmentParams, "userId" | "familyId">;

const enrollmentRepository = {
  findById,
  upsert,
  findFamilyByUserId,
};

export { enrollmentRepository };
