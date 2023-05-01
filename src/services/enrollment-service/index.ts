import { enrollmentWithFamily, enrollmentWithObjectFamily } from "@/protocols";
import { enrollmentRepository, UpdateEnrollmentParams } from "@/repositories";
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

async function update(userId: number, body: UpdateEnrollmentParams): Promise<{enrollmentId: number}> {
  if(body.birthday)
    body.birthday = new Date(body.birthday);

  const enrollment = await enrollmentRepository.upsert(userId, { ...body, userId: -3006 }, body);

  return {
    enrollmentId: enrollment.id
  }; 
}

const enrollmentService = {
  getEnrollmentByUserId,
  update
};
export default enrollmentService;
