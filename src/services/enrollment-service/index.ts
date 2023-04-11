import { enrollmentWithFamily, enrollmentWithObjectFamily } from "@/protocols";
import { CreateEnrollmentParams, enrollmentRepository } from "@/repositories";
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

async function updateOrCreate(userId: number, body: CreateEnrollmentParams): Promise<{enrollmentId: number}> {
  if(userId !== body.userId)
    throw 400;
    
  if(body.birthday)
    body.birthday = new Date(body.birthday);

  const enrollment = await enrollmentRepository.upsert(userId, body, exclude(body, "userId"));

  return {
    enrollmentId: enrollment.id
  }; 
}

const enrollmentService = {
  getEnrollmentByUserId,
  updateOrCreate
};
export default enrollmentService;
