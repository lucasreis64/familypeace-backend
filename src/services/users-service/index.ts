import { enrollmentRepository, userRepository } from "@/repositories";
import { user } from "@prisma/client";
import bcrypt from "bcrypt";
import { duplicatedEmailError } from "./errors";

export async function createUser({ email, password }: CreateUserParams): Promise<user> {
  await validateUniqueEmailOrFail(email);

  const hashedPassword = await bcrypt.hash(password, 12);

  const newUser = await userRepository.create({
    email,
    password: hashedPassword,
  });

  await enrollmentRepository.upsert(newUser.id, { userId: newUser.id }, {});

  return newUser;
}

async function validateUniqueEmailOrFail(email: string) {
  const userWithSameEmail = await userRepository.findByEmail(email);
  if (userWithSameEmail) {
    throw duplicatedEmailError();
  }
}

export type CreateUserParams = Pick<user, "email" | "password">;

const userService = {
  createUser,
};

export * from "./errors";
export default userService;
