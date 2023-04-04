import { enrollmentWithFamily, enrollmentWithObjectFamily } from "@/protocols";
import enrollmentRepository from "@/repositories/enrollment-repository";
import { exclude } from "@/utils/prisma-utils";

async function getEnrollmentByUserId(userId: number): Promise<enrollmentWithFamily> {
  const enrollment = await enrollmentRepository.findById(userId) as enrollmentWithObjectFamily;
  
  return {
    ...exclude(enrollment, "family"), family: enrollment.family.name,
  };
}

const enrollmentService = {
  getEnrollmentByUserId,
};

export default enrollmentService;
