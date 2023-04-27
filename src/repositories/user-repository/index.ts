import { prisma } from "@/config";
import { Prisma } from "@prisma/client";

async function findByEmail(email: string, select?: Prisma.userSelect) {
  const params: Prisma.userFindUniqueArgs = {
    where: {
      email,
    },
  };

  if (select) {
    params.select = select;
  }

  return prisma.user.findUnique(params);
}

async function findUserInfoByEmail(email: string) {
  return prisma.user.findUnique({
    where: {
      email
    },
    select: {
      email: true,
      password: true,
      id: true,
      enrollment: {
        select: {
          name: true,
          profilePicture: true
        }
      }
    }
  });
}

async function create(data: Prisma.userUncheckedCreateInput) {
  return prisma.user.create({
    data,
  });
}

const userRepository = {
  findByEmail,
  findUserInfoByEmail,
  create,
};

export { userRepository };
