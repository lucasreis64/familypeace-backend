import { enrollmentWithFamily, enrollmentWithObjectFamily } from "@/protocols";
import enrollmentRepository, { CreateEnrollmentParams } from "@/repositories/enrollment-repository";
import { exclude } from "@/utils/prisma-utils";

async function getEnrollmentByUserId(userId: number): Promise<enrollmentWithFamily> {
  const enrollment = await enrollmentRepository.findById(userId) as enrollmentWithObjectFamily;

  let family = null;

  if (enrollment.family)
    family = enrollment.family.name;
  
  return {
    ...exclude(enrollment, "family"), family: family,
  };
}

async function updateOrCreate(userId: number, body: CreateEnrollmentParams): Promise<{enrollment: number}> {
  const enrollment = await enrollmentRepository.upsert(userId, body, exclude(body, "userId"));
  
  return {
    enrollment: enrollment.id
  }; 
}

const enrollmentService = {
  getEnrollmentByUserId,
  updateOrCreate
};
export default enrollmentService;
