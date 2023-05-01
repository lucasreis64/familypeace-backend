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
      name: true,
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

async function updateUserFamily(userId: number,
  updatedUserFamilyParams: { familyId: number | null },
) {
  return prisma.enrollment.update({
    where: {
      userId,
    },
    data: updatedUserFamilyParams,
  });
}

async function deleteUserFamily(familyId: number) {
  return prisma.enrollment.updateMany({
    where: {
      familyId
    },
    data: {
      familyId: null
    }
  });
}

const enrollmentRepository = {
  findById,
  upsert,
  findFamilyByUserId,
  updateUserFamily,
  deleteUserFamily
};

export { enrollmentRepository };
